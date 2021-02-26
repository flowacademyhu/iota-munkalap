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
    private static final String DESCRIPTION_3000 = "SZENT ISTVÁN KIRÁLY INTELMEI IMRE HERCEGHEZMivel megértem s" +
            " mélyen átérzem, hogy amit csak Isten akarata megteremtett s nyilvánvaló eleve elrendelése elrendezett mind" +
            " a kiterjedt égboltozaton, mind az egybefüggő földi tájakon, azt törvény élteti s tartja fenn, s mivel látom," +
            " hogy mindazt, amit Isten kegyelme bőséggel adott az élet előnyére és méltóságára, tudniillik királyságokat," +
            " konzulságokat, hercegségeket, ispánságokat, főpapságokat s más méltóságokat, részben isteni parancsok" +
            " és rendeletek, részben világiak, valamint a nemesek meg az élemedett korúak tanácsai és javaslatai" +
            " kormányozzák, védik, osztják fel és egyesítik, s mivel bizonyosan tudom, hogy minden renden valók a föld" +
            " bármely részén, bármilyen méltóságot viseljenek, nemcsak kíséretüknek, híveiknek, szolgáiknak parancsolnak," +
            " tanácsolnak, javasolnak, hanem fiaiknak is, úgy hát én sem restellem, szerelmetes fiam, hogy neked még " +
            "életemben tanulságokat, parancsokat, tanácsokat, javaslatokat adjak, hogy velük mind a magad, mind" +
            " alattvalóid életmódját ékesítsed, ha majd a legfőbb hatalom engedélyével utánam uralkodni fogsz. " +
            "Illik pedig, hogy odaadó figyelemmel hallgatván eszedbe vésd apád parancsait, az isteni bölcsesség intelme" +
            " szerint, mely Salamon szájából szól:Hallgass, fiam, atyád intelmére,s ne vedd semmibe anyád tanítását!..." +
            "[Hallgasd hát meg, fiam, fogadd el szavaimat,]akkor nagy lesz száma élted éveinek.Ebből a mondásból tehát " +
            "észbe veheted, ha azt, amit atyai gyöngédséggel parancsolok, megveted - távol legyen! -, nem szívelnek " +
            "többé sem Isten, sem az emberek. De halljad az engedetlen parancsszegők esetét és vesztét. Ádám ugyanis, " +
            "kit az isteni alkotó, valamennyi létező teremtője a maga hasonlatosságára formált, s minden méltóság " +
            "örökösévé tett, széttörte a parancsok bilincsét, s nyomban elvesztette a magas méltóságokat meg a " +
            "paradicsombéli lakást. Isten régi, kiválasztott s kivált kedvelt népe is, amiért szétszaggatta a törvények " +
            "Isten ujjával kötözött kötelékét, különb-különbféleképpen pusztult el: részben ugyanis a föld nyelte el, " +
            "részben tűz emésztette el, részint egymást koncolta fel. Salamon fia is, félrevetve apja békéltető szavait," +
            " gőgjében pöffeszkedve kardcsapásokkal fenyegette a népet apja ostorsuhintásai helyett, azért sok rosszat" +
            " tűrt el országában, végül is kivetették onnan. Hogy ez véled ne történjék, fogadj szót, fiam; gyermek" +
            " vagy, gazdagságban született kis cselédem, puha párnák lakója, minden gyönyörűségben dédelgetve és " +
            "nevelve, nem tapasztaltad a hadjáratok fáradalmait s a különféle népek támadásait, melyekben én szinte" +
            " egész életemet lemorzsoltam. Itt az idő, hogy többé ne puha kásával étessenek, az téged csak puhánnyá s " +
            "finnyássá tehet, ez pedig a férfiasság elvesztegetése s a bűnök csiholója és a törvények megvetése; hanem " +
            "itassanak meg olykor fanyar borral, mely értelmedet tanításomra figyelmessé teszi.Ezeket előrebocsátván " +
            "térjünk a tárgyra.FEJEZETEKRE OSZTÁSA katolikus hit megőrzésérőlAz egyházi rend becsben tartásáról" +
            "A főpapoknak járó tiszteletről.......";

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
                .body("workerSignature", notNullValue())
                .body("proofOfEmployment", notNullValue())
                .body("typeOfWork", equalTo(TYPE_OF_WORK.name()))
                .body("assetSettlement", equalTo(ASSET_SETTLEMENT.name()))
                .body("workingTimeAccounting", equalTo(WORKING_TIME_ACCOUNTING.name()))
                .body("numberOfEmployees", equalTo(NUMBER_OF_EMPLOYEES))
                .body("overheadHour", equalTo(OVERHEAD_HOUR))
                .body("createdAt", equalTo(actualDate))
                .statusCode(201)
                .extract().body().as(Worksheet.class);

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