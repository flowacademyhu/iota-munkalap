package hu.flowacademy.worksheet.controller;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static hu.flowacademy.worksheet.helper.TestHelper.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasItem;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PartnerControllerTest {

    private static final String NEV = "Teszt Partner";

    @LocalServerPort
    private int port;

    @BeforeEach
    private void setUp() {
        RestAssured.port = port;
    }

    @Test
    public void create() {
        createPartner();
    }

    @Test
    public void testFilerUserReturnList() {
        given()
                .header(getAuthorization(adminLogin()))
                .param("searchCriteria", "Teszt")
                .when().get("api/partners")
                .then()
                .log().all()
                .body("nev", hasItem(NEV));
    }
}