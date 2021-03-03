package hu.flowacademy.worksheet.controller;

import com.github.javafaker.Faker;
import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.User;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Locale;

import static hu.flowacademy.worksheet.helper.TestHelper.adminLogin;
import static hu.flowacademy.worksheet.helper.TestHelper.getAuthorization;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class UserControllerTest {

    @LocalServerPort
    private int port;

    private static final String FIRSTNAME = "Béla";
    private static final String LASTNAME = "Negyedik";
    private static Faker faker = new Faker(Locale.forLanguageTag("hu"));
    private UserOperationDTO toCheck = givenaUserOpsDTO();
    @BeforeEach
    public void beforeAll() {
        RestAssured.port = port;
    }

    @Test
    public void testSuccessfulCreationReturns201(){
        given()
                .log().all()
                .header(getAuthorization(adminLogin()))
                .body(toCheck)
                .contentType(ContentType.JSON)
                .when().post("api/users")
                .then()
                .log().all()
                .body("id", notNullValue())
                .body("firstName", equalTo(toCheck.getFirstName()))
                .body("lastName", equalTo(toCheck.getLastName()))
                .body("email", equalTo(toCheck.getEmail()))
                .statusCode(201);
    }

    @Disabled
    @Test
    public void testFilerUserReturnList() {
        UserOperationDTO[] toCheckArray = given()
                .header(getAuthorization(adminLogin()))
                .param("searchCriteria", FIRSTNAME.substring(1))
                .when().get("api/users")
                .then()
                .log().all()
                .extract().body().as(UserOperationDTO[].class);
        Assertions.assertTrue(toCheckArray[0].getFirstName().contains(FIRSTNAME.substring(1)));
    }

    private UserOperationDTO givenaUserOpsDTO() {
        return UserOperationDTO.builder()
                .email(faker.internet().emailAddress())
                .firstName(FIRSTNAME)
                .lastName(LASTNAME)
                .password("1234")
                .build();
    }
}