package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.PartnerDTO;
import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.enumCustom.Role;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import com.github.javafaker.Faker;

import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.*;
import static io.restassured.RestAssured.given;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PartnerControllerTest {

    @LocalServerPort
    private int port;

    @Test
    public String login() {
        return given()
                .log().all()
                .body(UserOperationDTO.builder().email("superadmin@superadmin.hu").password("superadmin").build())
                .contentType(ContentType.JSON)
                .when()
                .post("/api/login")
                .then()
                .log().all()
                .assertThat()
                .contentType(ContentType.JSON)
                .statusCode(201)
                .body("$", notNullValue())
                .extract().body().as(AccessTokenResponse.class).getToken();
    }
}

/*private static ProductDTO createProduct() {
        String name = faker.funnyName().name();
        BigDecimal price = BigDecimal.valueOf(faker.number().numberBetween(100, 10000));
        return given().header(getAuthorization(login(Role.USER))).log().all()
                .body(ProductDTO.builder()
                        .name(name)
                        .price(price)
                        .build())
                .contentType(ContentType.JSON)
                .when().post("/api/products")
                .then().log().all()
                .contentType(ContentType.JSON)
                .statusCode(201)
                .body("$", notNullValue())
                .body("name", equalTo(name))
                .body("price", equalTo(price.intValue()))
                .body("createdBy", equalTo(USER))
                .body("createdAt", notNullValue())
                .extract().body().as(ProductDTO.class);
    }
}*/