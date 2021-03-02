package hu.flowacademy.worksheet.helper;

import hu.flowacademy.worksheet.dto.PartnerDTO;
import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.enumCustom.OrderType;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.hamcrest.Matchers;
import org.keycloak.representations.AccessTokenResponse;

import static hu.flowacademy.worksheet.enumCustom.OrderType.LEGAL;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.equalTo;

public class TestHelper {

    private static final String PARTNER_EMAIL = "partner@partner.hu";
    private static final String TELEFON = "06-30-123-45-67";
    private static final OrderType MEGRENDELO_TIPUSA = LEGAL;
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
    private static final Boolean ENABLED = true;

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

    public static Partner createPartner() {
        return given().header(getAuthorization(adminLogin())).log().all()
                .body(givenPartnerDTO())
                .contentType(ContentType.JSON)
                .when()
                .post("/api/partners")
                .then().log().all()
                .contentType(ContentType.JSON)
                .statusCode(201)
                .assertThat()
                .body("$", Matchers.notNullValue())
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
                .body("aktiv", equalTo(ENABLED))
                .extract().body().as(Partner.class);
    }

    private static PartnerDTO givenPartnerDTO() {
        return PartnerDTO.builder()
                .partnerEmail(PARTNER_EMAIL)
                .telefon(TELEFON)
                .megrendeloTipusa(MEGRENDELO_TIPUSA)
                .nev(NEV)
                .rovidNev(ROVID_NEV)
                .adoszam(ADOSZAM)
                .kAdoszamtipus(K_ADOSZAM_TIPUS)
                .bankszamlaszam(BANKSZAMLASZAM)
                .szamlazasiCimOrszagKod(ORSZAG_KOD)
                .szamlazasiCimOrszagNev(ORSZAG_NEV)
                .szamlazasiCimMegyeNev(MEGYE_NEV)
                .szamlazasiCimIranyitoszam(IRANYITOSZAM)
                .szamlazasiCimTelepulesNev(TELEPULESNEV)
                .szamlazasiCimKerulet(KERULET)
                .szamlazasiCimKozteruletNev(KOZTERULET_NEV)
                .szamlazasiCimKozteruletJellegNev(JELLEG_NEV)
                .szamlazasiCimHazszam(HAZSZAM)
                .szamlazasiCimEpulet(EPULET)
                .szamlazasiCimLepcsohaz(LEPCSOHAZ)
                .szamlazasiCimSzint(SZINT)
                .szamlazasiCimAjto(AJTO)
                .szamlazasiCimHrsz(HRSZ)
                .enabled(ENABLED)
                .build();
    }
}
