package hu.flowacademy.worksheet.controller;
import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.enumCustom.*;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static hu.flowacademy.worksheet.enumCustom.TypeOfPayment.CASH;
import static hu.flowacademy.worksheet.helper.TestHelper.*;
import static io.restassured.RestAssured.*;
@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class WorksheetControllerTest {

    private final static String PARTNER_ID = "PartnerId";
    private final static TypeOfWork TYPE_OF_WORK = TypeOfWork.REPAIR;
    private final static AssetSettlement ASSET_SETTLEMENT = AssetSettlement.REPAYMENT;
    private final static WorkingTimeAccounting WORKING_TIME_ACCOUNTING = WorkingTimeAccounting.REPAYMENT;
    private final static int NUMBER_OF_EMPLOYEES = 1;
    private final static float OVERHEAD_HOUR = 1.5f;
    private static final float DELIVERY_KM = 30.0F;
    private static final String ACCOUNT_SERIAL_NUMBER = "Szerelés sorszáma";
    private static final String DESCRIPTION = "Szerelés az objektumnál";
    private static final String USED_MATERIAL = "vezeték, szög, tipni";
    private static final TypeOfPayment TYPE_OF_PAYMENT = CASH;
    private static final String WORKER_SIGNATURE = "Nagy Lajos";
    private static final String PROOF_OF_EMPLOYMENT = "Károly Róbert";

    @LocalServerPort
    private int port;

    @BeforeEach
    public void beforeAll() {
        RestAssured.port = port;
    }

    @Test
    public void successfulCreationReturns201() {
        given()
                .log().all()
                .header(getAuthorization(adminLogin()))
                .body(WorksheetDTO.builder()
                        .partnerId(PARTNER_ID)
                        .typeOfWork(TYPE_OF_WORK)
                        .assetSettlement(ASSET_SETTLEMENT)
                        .workingTimeAccounting(WORKING_TIME_ACCOUNTING)
                        .numberOfEmployees(NUMBER_OF_EMPLOYEES)
                        .overheadHour(OVERHEAD_HOUR)
                        .deliveryKm(DELIVERY_KM)
                        .accountSerialNumber(ACCOUNT_SERIAL_NUMBER)
                        .description(DESCRIPTION)
                        .usedMaterial(USED_MATERIAL)
                        .typeOfPayment(TYPE_OF_PAYMENT)
                        .workerSignature(WORKER_SIGNATURE)
                        .proofOfEmployment(PROOF_OF_EMPLOYMENT)
                        .build())
                .contentType(ContentType.JSON)
                .when().post("api/worksheets").
                then()
                .log().all()
                .assertThat()
                .statusCode(201);
    }
}