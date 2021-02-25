package hu.flowacademy.worksheet.helper;

import hu.flowacademy.worksheet.dto.UserOperationDTO;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.keycloak.representations.AccessTokenResponse;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.notNullValue;

public class TestHelper {
    public static Header getAuthorization(String token) {
        return new Header("Authorization", "Bearer " + token);
    }

    public static String adminLogin() {
        return given()
                .body(UserOperationDTO.builder().email("superadmin@superadmin.hu").password("superadmin").build())
                .contentType(ContentType.JSON)
                .when()
                .post("/api/login")
                .then()
                .log().all()
                .assertThat()
                .body("access_token", notNullValue())
                .statusCode(200)
                .extract().body().as(AccessTokenResponse.class).getToken();
    }
}
