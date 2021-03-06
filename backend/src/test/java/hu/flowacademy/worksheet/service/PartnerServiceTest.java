package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.OrderType;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.enumCustom.Status;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.PartnerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static hu.flowacademy.worksheet.enumCustom.OrderType.LEGAL;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PartnerServiceTest {

    private static final String PARTNER_ID = "Partner_id1";
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

    private static final String INVALID_TEST_EMAIL = "partnerteszt.com";
    private static final String EMPTY_STRING = "";
    private static final String RONTOTT_ADOSZAM = "1234*678";
    private static final String RONTOTT_HOSSZUSAGU_ADOSZAM = "123456789";
    private static final int RONTOTT_K_ADOSZAM = 6;
    private static final String RONTOTT_BANKSZAMLASZAM = "1234f678-1234-678";
    private static final String RONTOTT_BANKSZAMLASZAM_HOSSZ = "12345678-123456789";

    @Mock
    private PartnerRepository partnerRepository;

    @InjectMocks
    private PartnerService partnerService;

    @Test
    public void givenNewPartner_whenSavingPartner_thenGreatSuccess() throws ValidationException {
        var partner = givenValidPartner();
        when(partnerRepository.save(any())).thenReturn(Partner.builder()
                .partnerId(PARTNER_ID)
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
                .build());

        Partner result = partnerService.createPartner(partner);
        Mockito.verify(partnerRepository, times(1)).save(partner);
        assertEquals(partner.getPartnerEmail(), result.getPartnerEmail());
        assertEquals(partner.getTelefon(), result.getTelefon());
        assertEquals(partner.getMegrendeloTipusa(), result.getMegrendeloTipusa());
        assertEquals(partner.getNev(), result.getNev());
        assertEquals(partner.getRovidNev(), result.getRovidNev());
        assertEquals(partner.getAdoszam(), result.getAdoszam());
        assertEquals(partner.getKAdoszamtipus(), result.getKAdoszamtipus());
        assertEquals(partner.getBankszamlaszam(), result.getBankszamlaszam());
        assertEquals(partner.getSzamlazasiCimOrszagKod(), result.getSzamlazasiCimOrszagKod());
        assertEquals(partner.getSzamlazasiCimOrszagNev(), result.getSzamlazasiCimOrszagNev());
        assertEquals(partner.getSzamlazasiCimMegyeNev(), result.getSzamlazasiCimMegyeNev());
        assertEquals(partner.getSzamlazasiCimIranyitoszam(), result.getSzamlazasiCimIranyitoszam());
        assertEquals(partner.getSzamlazasiCimTelepulesNev(), result.getSzamlazasiCimTelepulesNev());
        assertEquals(partner.getSzamlazasiCimKerulet(), result.getSzamlazasiCimKerulet());
        assertEquals(partner.getSzamlazasiCimKozteruletNev(), result.getSzamlazasiCimKozteruletNev());
        assertEquals(partner.getSzamlazasiCimKozteruletJellegNev(), result.getSzamlazasiCimKozteruletJellegNev());
        assertEquals(partner.getSzamlazasiCimHazszam(), result.getSzamlazasiCimHazszam());
        assertEquals(partner.getSzamlazasiCimEpulet(), result.getSzamlazasiCimEpulet());
        assertEquals(partner.getSzamlazasiCimLepcsohaz(), result.getSzamlazasiCimLepcsohaz());
        assertEquals(partner.getSzamlazasiCimSzint(), result.getSzamlazasiCimSzint());
        assertEquals(partner.getSzamlazasiCimAjto(), result.getSzamlazasiCimAjto());
        assertEquals(partner.getSzamlazasiCimHrsz(), result.getSzamlazasiCimHrsz());
        verifyNoMoreInteractions(partnerRepository);

    }

    @Test
    public void givenInvalidEmailPartner_whenCreatingPartner_thenThrowException() {
        Partner partnerData = Partner.builder().partnerEmail(INVALID_TEST_EMAIL).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenInvalidEmailPartnerWithEmptyString_whenCreatingPartner_ThenThrowException() {
        Partner partnerData = Partner.builder().partnerEmail(EMPTY_STRING).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenInvalidTaxAccount_whenCreatingPartner_ThenThrowException() {
        Partner partnerData = Partner.builder().adoszam(RONTOTT_ADOSZAM).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenInvalidTaxAccountLength_whenCreatingPartner_ThenThrowException() {
        Partner partnerData = Partner.builder().adoszam(RONTOTT_HOSSZUSAGU_ADOSZAM).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenInvalidKTaxAccountType_whenCreatingPartner_ThenThrowException() {
        Partner partnerData = Partner.builder().kAdoszamtipus(RONTOTT_K_ADOSZAM).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenInvalidBankAccount_whenCreatingPartner_ThenThrowException() {
        Partner partnerData = Partner.builder().bankszamlaszam(RONTOTT_BANKSZAMLASZAM).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenInvalidBankAccountLength_whenCreatingPartner_ThenThrowException() {
        Partner partnerData = Partner.builder().bankszamlaszam(RONTOTT_BANKSZAMLASZAM_HOSSZ).build();
        assertThrows(ValidationException.class, () -> partnerService.createPartner(partnerData));
    }

    @Test
    public void givenAWorksheetId_whenGetAWorksheet_thenGotTheWorksheet() throws ValidationException {
        givenExistingOnePartner();
        Partner result = partnerService.getPartnerById(PARTNER_ID);

        Mockito.verify(partnerRepository, times(1)).findById(PARTNER_ID);
        assertThat(result.getPartnerId(), notNullValue());
        assertThat(result.getPartnerId(), is(PARTNER_ID));
        verifyNoMoreInteractions(partnerRepository);
    }

    @Test
    public void givenNewWorksheetObject_whenUpdateWorksheet_thenWorksheetUpdated() throws ValidationException {
        givenExistingPartnerWhenUpdate();
        Partner newPartner = givenValidPartner();
        Partner updatedPartner = partnerService.update(PARTNER_ID, newPartner);

        Mockito.verify(partnerRepository, times(1)).save(updatedPartner);
        assertThat(updatedPartner, notNullValue());
        assertThat(updatedPartner.getPartnerEmail(), is(newPartner.getPartnerEmail()));
        assertThat(updatedPartner.getTelefon(), is(newPartner.getTelefon()));
        assertThat(updatedPartner.getMegrendeloTipusa(), is(newPartner.getMegrendeloTipusa()));
        assertThat(updatedPartner.getNev(), is(newPartner.getNev()));
        assertThat(updatedPartner.getRovidNev(), is(newPartner.getRovidNev()));
        assertThat(updatedPartner.getAdoszam(), is(newPartner.getAdoszam()));
        assertThat(updatedPartner.getKAdoszamtipus(), is(newPartner.getKAdoszamtipus()));
        assertThat(updatedPartner.getBankszamlaszam(), is(newPartner.getBankszamlaszam()));
        assertThat(updatedPartner.getSzamlazasiCimOrszagKod(), is(newPartner.getSzamlazasiCimOrszagKod()));
        assertThat(updatedPartner.getSzamlazasiCimOrszagNev(), is(newPartner.getSzamlazasiCimOrszagNev()));
        assertThat(updatedPartner.getSzamlazasiCimMegyeNev(), is(newPartner.getSzamlazasiCimMegyeNev()));
        assertThat(updatedPartner.getSzamlazasiCimIranyitoszam(), is(newPartner.getSzamlazasiCimIranyitoszam()));
        assertThat(updatedPartner.getSzamlazasiCimTelepulesNev(), is(newPartner.getSzamlazasiCimTelepulesNev()));
        assertThat(updatedPartner.getSzamlazasiCimKerulet(), is(newPartner.getSzamlazasiCimKerulet()));
        assertThat(updatedPartner.getSzamlazasiCimKozteruletNev(), is(newPartner.getSzamlazasiCimKozteruletNev()));
        assertThat(updatedPartner.getSzamlazasiCimKozteruletJellegNev(), is(newPartner.getSzamlazasiCimKozteruletJellegNev()));
        assertThat(updatedPartner.getSzamlazasiCimHazszam(), is(newPartner.getSzamlazasiCimHazszam()));
        assertThat(updatedPartner.getSzamlazasiCimEpulet(), is(newPartner.getSzamlazasiCimEpulet()));
        assertThat(updatedPartner.getSzamlazasiCimLepcsohaz(), is(newPartner.getSzamlazasiCimLepcsohaz()));
        assertThat(updatedPartner.getSzamlazasiCimSzint(), is(newPartner.getSzamlazasiCimSzint()));
        assertThat(updatedPartner.getSzamlazasiCimAjto(), is(newPartner.getSzamlazasiCimAjto()));
        assertThat(updatedPartner.getSzamlazasiCimHrsz(), is(newPartner.getSzamlazasiCimHrsz()));
        verifyNoMoreInteractions(partnerRepository);
    }

    private void givenExistingPartnerWhenUpdate() {
        when(partnerRepository.findById(PARTNER_ID))
                .thenReturn(Optional.of(givenPartnerWithProperId()));
        when(partnerRepository.save(any(Partner.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    @Test
    public void givenAnExistingPartner_whenSETTINGActivity_thenActivityIsUpdated() throws ValidationException {
        givenExistingPartner();
        Partner result = partnerService.setPartnerActivity(PARTNER_ID, Status.inactive);
        Mockito.verify(partnerRepository, times(1)).save(result);
        assertThat(result, notNullValue());
        assertThat(result.getEnabled(), notNullValue());
        assertThat(result.getEnabled(), is(false));
    }

    private void givenExistingPartner() {
        Partner partner = new Partner();
        partner.setPartnerId(PARTNER_ID);
        partner.setEnabled(true);
        when(partnerRepository.findById(PARTNER_ID)).thenReturn(Optional.of(partner));
        when(partnerRepository.save(any(Partner.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private Partner givenValidPartner() {
        return Partner.builder()
                .partnerId(PARTNER_ID)
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

    private void givenExistingOnePartner() {
        when(partnerRepository.findById(PARTNER_ID)).thenReturn(Optional.of(givenPartnerWithProperId()));
    }

    private Partner givenPartnerWithProperId() {
        return givenValidPartner().toBuilder().partnerId(PARTNER_ID).build();
    }
}