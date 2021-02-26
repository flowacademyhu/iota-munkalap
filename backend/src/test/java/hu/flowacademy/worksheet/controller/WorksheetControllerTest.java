package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.AssetSettlement;
import hu.flowacademy.worksheet.enumCustom.TypeOfPayment;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
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
import static org.hamcrest.MatcherAssert.assertThat;
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
    private static final String DESCRIPTION_3000 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " +
            "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient " +
            "montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla" +
            " consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim " +
            "justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer" +
            " tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula," +
            " porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a," +
            " tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies" +
            " nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus " +
            "eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc," +
            " blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae" +
            " sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt." +
            " Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget " +
            "bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien." +
            " Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. " +
            "Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et " +
            "ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis " +
            "arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer " +
            "ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper " +
            "ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et " +
            "nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed " +
            "lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet " +
            "imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur" +
            " ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue " +
            "erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit." +
            " Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi " +
            "quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer " +
            "vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede " +
            "sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tor";

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

    @Test
    public void checkTheDescriptionWith3000Character() {
        Worksheet worksheet = given()
                .log().all()
                .header(getAuthorization(adminLogin()))
                .body(givenWorksheetDescription())
                .contentType(ContentType.JSON)
                .when().post("api/worksheets").
                        then()
                .log().all()
                .body("description", equalTo(DESCRIPTION_3000))
                .statusCode(201)
                .assertThat()
                .extract().as(Worksheet.class);
        assertThat(worksheet, Matchers.notNullValue());

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

    private WorksheetDTO givenWorksheetDescription() {
        return WorksheetDTO.builder()
                .partnerId(PARTNER_ID)
                .typeOfWork(TYPE_OF_WORK)
                .assetSettlement(ASSET_SETTLEMENT)
                .workingTimeAccounting(WORKING_TIME_ACCOUNTING)
                .numberOfEmployees(NUMBER_OF_EMPLOYEES)
                .overheadHour(OVERHEAD_HOUR)
                .deliveryKm(DELIVERY_KM)
                .accountSerialNumber(ACCOUNT_SERIAL_NUMBER)
                .description(DESCRIPTION_3000)
                .usedMaterial(USED_MATERIAL)
                .typeOfPayment(TYPE_OF_PAYMENT)
                .workerSignature(WORKER_SIGNATURE)
                .proofOfEmployment(PROOF_OF_EMPLOYMENT)
                .createdAt(CREATED_AT)
                .build();
    }

}