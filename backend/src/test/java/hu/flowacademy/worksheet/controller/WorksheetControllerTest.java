package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.enumCustom.AssetSettlement;
import hu.flowacademy.worksheet.enumCustom.TypeOfPayment;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static hu.flowacademy.worksheet.enumCustom.TypeOfPayment.CASH;
import static hu.flowacademy.worksheet.helper.TestHelper.adminLogin;
import static hu.flowacademy.worksheet.helper.TestHelper.getAuthorization;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class WorksheetControllerTest {
    private final static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
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
    private final static String actualDate = "2021.02.25";
    private static final LocalDate CREATED_AT = LocalDate.parse(actualDate, formatter);

    @LocalServerPort
    private int port;

    @BeforeEach
    public void beforeAll() {
        RestAssured.port = port;
    }

    @Test
    public void testSuccessfulCreationReturns201() {
        given()
                .log().all()
                .header(getAuthorization(adminLogin()))
                .body(givenAWorksheetDTO())
                .contentType(ContentType.JSON)
                .when().post("api/worksheets").
                then()
                .log().all()
                .body("id", notNullValue())
                .body("deliveryKm", equalTo(DELIVERY_KM))
                .body("accountSerialNumber", equalTo(ACCOUNT_SERIAL_NUMBER))
                .body("usedMaterial", equalTo(USED_MATERIAL))
                .body("description", equalTo(DESCRIPTION))
                .body("usedMaterial", equalTo(USED_MATERIAL))
                .body("typeOfPayment", equalTo(TYPE_OF_PAYMENT.name()))
                .body("workerSignature", equalTo(WORKER_SIGNATURE))
                .body("proofOfEmployment", equalTo(PROOF_OF_EMPLOYMENT))
                .body("typeOfWork", equalTo(TYPE_OF_WORK.name()))
                .body("assetSettlement", equalTo(ASSET_SETTLEMENT.name()))
                .body("workingTimeAccounting", equalTo(WORKING_TIME_ACCOUNTING.name()))
                .body("numberOfEmployees", equalTo(NUMBER_OF_EMPLOYEES))
                .body("overheadHour", equalTo(OVERHEAD_HOUR))
                .body("createdAt", equalTo(actualDate))
                .statusCode(201);

    }

    private WorksheetDTO givenAWorksheetDTO() {
        return WorksheetDTO.builder()
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
                .createdAt(CREATED_AT)
                .build();
    }
}