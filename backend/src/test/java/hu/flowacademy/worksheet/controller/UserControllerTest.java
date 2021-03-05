package hu.flowacademy.worksheet.controller;

import com.github.javafaker.Faker;
import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Status;
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
import static org.hamcrest.Matchers.*;

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
    private static final String EMAIL = faker.internet().emailAddress();
    private static final String FIRSTNAME_UPDATED = faker.name().firstName();
    private static final String LASTNAME_UPDATED = faker.name().lastName();
    private static final String EMAIL_UPDATED = faker.internet().emailAddress();
    private UserOperationDTO toCheck = givenaUserOpsDTO();
    @BeforeEach
    public void beforeAll() {
        RestAssured.port = port;
    }

    @Test
    public void testMain() {
        testSuccessfulCreationReturns201();
        testFilerUserReturnList();
        testStatusSetting();
        testUserUpdate();
        testFindById();
    }

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


    public void testFilerUserReturnList() {
        given()
                .header(getAuthorization(adminLogin()))
                .param("searchCriteria", FIRSTNAME.substring(1))
                .when().get("api/users")
                .then()
                .log().all()
                .body("firstName", contains(FIRSTNAME));
    }

    public void testStatusSetting() {
        given()
                .header(getAuthorization(adminLogin()))
                .pathParam("id", 2)
                .pathParam("status", Status.inactive)
                .when().put("api/users/{id}/{status}")
                .then()
                .log().all()
                .body("enabled", is(false));
    }

    public void testUserUpdate() {
        given()
                .header(getAuthorization(adminLogin()))
                .pathParam("id", 2)
                .body(givenUser())
                .contentType(ContentType.JSON)
                .when().put("api/users/{id}")
                .then()
                .body("lastName", is(LASTNAME_UPDATED))
                .body("firstName", is(FIRSTNAME_UPDATED));
    }

    public void testFindById() {
        given()
                .header(getAuthorization(adminLogin()))
                .pathParam("id", 2)
                .when().get("api/users/{id}")
                .then()
                .body("id", is(2))
                .body("lastName", is(LASTNAME_UPDATED));
    }

    private UserOperationDTO givenaUserOpsDTO() {
        return UserOperationDTO.builder()
                .email(EMAIL)
                .firstName(FIRSTNAME)
                .lastName(LASTNAME)
                .password("1234")
                .build();
    }

    private User givenUser() {
        return User.builder()
                .email(EMAIL_UPDATED)
                .firstName(FIRSTNAME_UPDATED)
                .lastName(LASTNAME_UPDATED)
                .build();
    }
}