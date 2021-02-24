package hu.flowacademy.worksheet.controller;
import hu.flowacademy.worksheet.dto.WorksheetDTO;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.*;

class WorksheetControllerTest {

    @Autowired
    private WorksheetDTO worksheetDTO;

    @BeforeAll
    public static void beforeAll() {
        RestAssured.port = 8081;
        RestAssured.baseURI = "http://localhost";
        RestAssured.rootPath = "/api";
    }

    @Test
    public void successfulCreationReturns200() {
        given()
                .body(worksheetDTO)
                .when().post("/worksheets").then().statusCode(200);
    }

}