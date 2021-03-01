package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.entity.Partner;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
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
    private static final String ROVID_NEV = "Teszt p";
    private static final String ADOSZAM = "01234567";
    private static final int K_ADOSZAM_TIPUS = 3;
    private static final String BANKSZAMLASZAM = "01234567-01234567";
    private static final String ORSZAG_KOD = "HU";
    private static final String ORSZAG_NEV = "Magyarország";
    private static final String MEGYE_NEV = "Csongrád-Csanád";
    private static final String IRANYITOSZAM = "9999";
    private static final String TELEPULESNEV = "Szeged";
    private static final String KERULET = "Kiss kerület";
    private static final String KOZTERULET_NEV = "Kossuth Lajos";
    private static final String JELLEG_NEV = "körút";
    private static final String HAZSZAM = "34";
    private static final String EPULET = "B";
    private static final String LEPCSOHAZ = "C";
    private static final String SZINT = "II.";
    private static final String AJTO = "11";
    private static final String HRSZ = "0123-4567-8901";
    private static final boolean ENABLED = true;

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


    private static Partner createPartner() {
        return given().header(getAuthorization(adminLogin())).log().all()
                .body(givenPartnerDTO())
                .contentType(ContentType.JSON)
                .when()
                .post("/api/partners")
                .then().log().all()
                .contentType(ContentType.JSON)
                .statusCode(201)
                .assertThat()
                .body("$", notNullValue())
                .body("partnerEmail", equalTo(PARTNER_EMAIL))
                .body("telefon", equalTo(TELEFON))
                .body("megrendeloTipusa", equalTo(MEGRENDELO_TIPUSA.name()))
                .body("nev", equalTo(NEV))
                .body("rovidNev", equalTo(ROVID_NEV))
                .body("adoszam", equalTo(ADOSZAM))
                .body("kadoszamtipus", equalTo(K_ADOSZAM_TIPUS))
                .body("bankszamlaszam", equalTo(BANKSZAMLASZAM))
                .body("szamlazasiCimOrszagKod", equalTo(ORSZAG_KOD))
                .body("szamlazasiCimOrszagNev", equalTo(ORSZAG_NEV))
                .body("szamlazasiCimMegyeNev", equalTo(MEGYE_NEV))
                .body("szamlazasiCimIranyitoszam", equalTo(IRANYITOSZAM))
                .body("szamlazasiCimTelepulesNev", equalTo(TELEPULESNEV))
                .body("szamlazasiCimKerulet", equalTo(KERULET))
                .body("szamlazasiCimKozteruletNev", equalTo(KOZTERULET_NEV))
                .body("szamlazasiCimKozteruletJellegNev", equalTo(JELLEG_NEV))
                .body("szamlazasiCimHazszam", equalTo(HAZSZAM))
                .body("szamlazasiCimEpulet", equalTo(EPULET))
                .body("szamlazasiCimLepcsohaz", equalTo(LEPCSOHAZ))
                .body("szamlazasiCimSzint", equalTo(SZINT))
                .body("szamlazasiCimAjto", equalTo(AJTO))
                .body("szamlazasiCimHrsz", equalTo(HRSZ))
                .body("Aktív", equalTo(ENABLED))
                .extract().body().as(Partner.class);
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
