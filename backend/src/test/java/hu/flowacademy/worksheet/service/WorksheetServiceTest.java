package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.*;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.WorksheetRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import static hu.flowacademy.worksheet.enumCustom.AssetSettlement.WARRANTY;
import static hu.flowacademy.worksheet.enumCustom.TypeOfPayment.*;
import static hu.flowacademy.worksheet.enumCustom.TypeOfWork.INSTALLATION;
import static hu.flowacademy.worksheet.enumCustom.TypeOfWork.REPAIR;
import static hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting.REPAYMENT;
import static hu.flowacademy.worksheet.enumCustom.TypeOfWork.OTHER;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorksheetServiceTest {

    private static final Pageable PAGEABLE = PageRequest.of(0, 1, Sort.by("createdAt").descending());

    private static final String WORKSHEET_ID = "Munkalap_id1";
    private static final String PARTNER_ID = "Partner_id1";
    private static final TypeOfWork TYPE_OF_WORK = INSTALLATION;
    private static final TypeOfWork TYPE_OF_WORK_OTHER = OTHER;
    private static final String CUSTOM_TYPE_OF_WORK = "Egyéb javítás";
    private static final AssetSettlement ASSET_SETTLEMENT = WARRANTY;
    private static final WorkingTimeAccounting WORKING_TIME_ACCOUNTING = REPAYMENT;
    private static final int NUMBER_OF_EMPLOYEES = 3;
    private static final float OVERHEAD_HOUR = 3.0F;
    private static final float DELIVERY_KM = 30.0F;
    private static final String ACCOUNT_SERIAL_NUMBER = "Szerelés sorszáma";
    private static final String DESCRIPTION = "Szerelés az objektumnál";
    private static final String USED_MATERIAL = "vezeték, szög, tipni";
    private static final TypeOfPayment TYPE_OF_PAYMENT = CASH;
    private static final String WORKER_SIGNATURE = "Nagy Lajos";
    private static final String PROOF_OF_EMPLOYMENT = "Károly Róbert";
    private static final String MIN_TIME = "1999.01.01 01:01:01";
    private static final String MAX_TIME = "2999.01.01 01:01:01";

    private static final String UPDATED_WORKSHEET_ID = "MunkalapIdUpdated";
    private static final String UPDATED_PARTNER_ID = "PartnerIdUpdated";
    private static final TypeOfWork UPDATED_TYPE_OF_WORK = REPAIR;
    private static final TypeOfWork UPDATED_TYPE_OF_WORK_OTHER = OTHER;
    private static final String UPDATED_CUSTOM_TYPE_OF_WORK = "További javítás";
    private static final AssetSettlement UPDATED_ASSET_SETTLEMENT = AssetSettlement.REPAYMENT;
    private static final WorkingTimeAccounting UPDATED_WORKING_TIME_ACCOUNTING = WorkingTimeAccounting.WARRANTY;
    private static final int UPDATED_NUMBER_OF_EMPLOYEES = 4;
    private static final float UPDATED_OVERHEAD_HOUR = 4.0F;
    private static final float UPDATED_DELIVERY_KM = 35.0F;
    private static final String UPDATED_ACCOUNT_SERIAL_NUMBER = "Szerelés sorszáma 11";
    private static final String UPDATED_DESCRIPTION = "Szerelés a nagy objektumnál";
    private static final String UPDATED_USED_MATERIAL = "vezeték, szög, tipni, lemezek";
    private static final TypeOfPayment UPDATED_TYPE_OF_PAYMENT = BANKTRANSFER;
    private static final String UPDATED_WORKER_SIGNATURE = "Luxemburgi Zsigmond";
    private static final String UPDATED_PROOF_OF_EMPLOYMENT = "Hunyadi János";

    @Mock
    private WorksheetRepository worksheetRepository;
    @Mock
    private PagingProperties pagingProperties;

    @InjectMocks
    private WorksheetService worksheetService;

    @Test
    public void givenNewWorksheet_whenSavingWorksheet_ThenGreatSuccess() throws ValidationException {
        var worksheet = givenValidWorksheet();
        when(worksheetRepository.save(any())).thenReturn(Worksheet.builder()
                .id(worksheet.getId())
                .partnerId(PARTNER_ID)
                .typeOfWork(TYPE_OF_WORK_OTHER)
                .customTypeOfWork(CUSTOM_TYPE_OF_WORK)
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
                .worksheetStatus(WorksheetStatus.CREATED)
                .build());

        Worksheet result = worksheetService.saveWorksheet(worksheet);

        Mockito.verify(worksheetRepository, times(1)).save(worksheet);
        assertEquals(worksheet.getPartnerId(), result.getPartnerId());
        assertEquals(worksheet.getTypeOfWork(), result.getTypeOfWork());
        assertEquals(worksheet.getAssetSettlement(), result.getAssetSettlement());
        assertEquals(worksheet.getWorkingTimeAccounting(), result.getWorkingTimeAccounting());
        assertEquals(worksheet.getNumberOfEmployees(), result.getNumberOfEmployees());
        assertEquals(worksheet.getOverheadHour(), result.getOverheadHour());
        assertEquals(worksheet.getDeliveryKm(), result.getDeliveryKm());
        assertEquals(worksheet.getAccountSerialNumber(), result.getAccountSerialNumber());
        assertEquals(worksheet.getDescription(), result.getDescription());
        assertEquals(worksheet.getUsedMaterial(), result.getUsedMaterial());
        assertEquals(worksheet.getTypeOfPayment(), result.getTypeOfPayment());
        assertEquals(worksheet.getWorkerSignature(), result.getWorkerSignature());
        assertEquals(worksheet.getProofOfEmployment(), result.getProofOfEmployment());
        assertEquals(WorksheetStatus.CREATED, result.getWorksheetStatus());
        verifyNoMoreInteractions(worksheetRepository);
    }

    @Test
    public void givenAnExistingWorksheet_whenSettingStatus_thenSetStatusToReported() throws ValidationException {
        givenExistingWorksheetForUpdateStatus();
        Worksheet result = worksheetService.setStatusWorksheet(WORKSHEET_ID, WorksheetStatus.CLOSED);
        assertThat(result, notNullValue());
        assertThat(result.getWorksheetStatus(), is(WorksheetStatus.CLOSED));
    }

    @Test
    public void givenAProperWorksheet_whenFilteringByDate_thenReturnItemInList() {
        givenAProperWorkSheetForListing();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
        LocalDateTime dateTimeMax = LocalDateTime.parse(MAX_TIME, formatter);
        LocalDateTime dateTimeMin = LocalDateTime.parse(MIN_TIME, formatter);
        List<Worksheet> result = worksheetService.collectWorksheetByCriteria(Optional
                .of(WorksheetStatus.CREATED), Optional.of(0), Optional.of(dateTimeMin), Optional.of(dateTimeMax), Optional.of(1), Optional.of("createdAt"));
        verify(worksheetRepository).findAll(any(Specification.class), eq(PAGEABLE));
        assertThat(result.get(0).getId(), is(WORKSHEET_ID));
        assertThat(result.get(0).getPartnerId(), is(PARTNER_ID));
        assertThat(result.size(), is(1));
    }

    @Test
    public void givenAWorksheetId_whenGetAWorksheet_thenGotTheWorksheet() throws ValidationException {
        givenExistingOneWorksheet();
        Worksheet result = worksheetService.getWorksheetById(WORKSHEET_ID);

        Mockito.verify(worksheetRepository, times(1)).findById(WORKSHEET_ID);
        assertThat(result.getId(), notNullValue());
        assertThat(result.getId(), is(WORKSHEET_ID));
        verifyNoMoreInteractions(worksheetRepository);
    }

    public void givenNewWorksheetObject_whenUpdateWorksheet_thenWorksheetUpdated() throws ValidationException {
        givenExistingWorksheetWhenUpdate();
        Worksheet newWorksheet = givenUpdateProperWorksheetObject();
        Worksheet updatedWorksheet = worksheetService.update(WORKSHEET_ID, newWorksheet);

        Mockito.verify(worksheetRepository, times(1)).save(updatedWorksheet);
        assertThat(updatedWorksheet, notNullValue());
        assertThat(updatedWorksheet.getPartnerId(), is(newWorksheet.getPartnerId()));
        assertThat(updatedWorksheet.getTypeOfWork(), is(newWorksheet.getTypeOfWork()));
        assertThat(updatedWorksheet.getCustomTypeOfWork(), is(newWorksheet.getCustomTypeOfWork()));
        assertThat(updatedWorksheet.getAssetSettlement(), is(newWorksheet.getAssetSettlement()));
        assertThat(updatedWorksheet.getWorkingTimeAccounting(), is(newWorksheet.getWorkingTimeAccounting()));
        assertThat(updatedWorksheet.getNumberOfEmployees(), is(newWorksheet.getNumberOfEmployees()));
        assertThat(updatedWorksheet.getOverheadHour(), is(newWorksheet.getOverheadHour()));
        assertThat(updatedWorksheet.getDeliveryKm(), is(newWorksheet.getDeliveryKm()));
        assertThat(updatedWorksheet.getAccountSerialNumber(), is(newWorksheet.getAccountSerialNumber()));
        assertThat(updatedWorksheet.getDescription(), is(newWorksheet.getDescription()));
        assertThat(updatedWorksheet.getUsedMaterial(), is(newWorksheet.getUsedMaterial()));
        assertThat(updatedWorksheet.getTypeOfPayment(), is(newWorksheet.getTypeOfPayment()));
        assertThat(updatedWorksheet.getWorkerSignature(), is(newWorksheet.getWorkerSignature()));
        assertThat(updatedWorksheet.getProofOfEmployment(), is(newWorksheet.getProofOfEmployment()));
        verifyNoMoreInteractions(worksheetRepository);
    }

    private void givenExistingWorksheet() {
        when(worksheetRepository.findById(WORKSHEET_ID)).thenReturn(Optional.of(givenWorksheetWithProperId()));
        when(worksheetRepository.save(any(Worksheet.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private void givenExistingWorksheetForUpdateStatus() {
        when(worksheetRepository.findById(WORKSHEET_ID)).thenReturn(Optional.of(givenWorksheetWithProperIdAndStatus()));
    }

    private void givenExistingOneWorksheet() {
        when(worksheetRepository.findById(WORKSHEET_ID)).thenReturn(Optional.of(givenWorksheetWithProperId()));
    }

    private void givenAProperWorkSheetForListing() {
        Page<Worksheet> pagedUsers = new PageImpl<Worksheet>(List.of(givenWorksheetWithProperId()), PAGEABLE, 1);
        when(worksheetRepository.findAll(any(Specification.class), eq(PAGEABLE))).thenReturn(pagedUsers);
    }

    private void givenExistingWorksheetWhenUpdate() {
        when(worksheetRepository.findById(WORKSHEET_ID))
                .thenReturn(Optional.of(givenWorksheetWithProperId()));
        when(worksheetRepository.save(any(Worksheet.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private Worksheet givenWorksheetWithProperId() {
        return givenValidWorksheet().toBuilder().id(WORKSHEET_ID).build();
    }

    private Worksheet givenWorksheetWithProperIdAndStatus() {
        return givenValidWorksheet().toBuilder().id(WORKSHEET_ID).worksheetStatus(WorksheetStatus.CLOSED).build();
    }

    private Worksheet givenValidWorksheet() {
        return Worksheet.builder()
                .partnerId(PARTNER_ID)
                .typeOfWork(TYPE_OF_WORK_OTHER)
                .customTypeOfWork(CUSTOM_TYPE_OF_WORK)
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
                .build();
    }

    private Worksheet givenUpdateProperWorksheetObject() {
        Worksheet worksheet = new Worksheet();
        worksheet.setId(UPDATED_WORKSHEET_ID);
        worksheet.setPartnerId(UPDATED_PARTNER_ID);
        worksheet.setTypeOfWork(UPDATED_TYPE_OF_WORK_OTHER);
        worksheet.setCustomTypeOfWork(UPDATED_CUSTOM_TYPE_OF_WORK);
        worksheet.setAssetSettlement(UPDATED_ASSET_SETTLEMENT);
        worksheet.setWorkingTimeAccounting(UPDATED_WORKING_TIME_ACCOUNTING);
        worksheet.setNumberOfEmployees(UPDATED_NUMBER_OF_EMPLOYEES);
        worksheet.setOverheadHour(UPDATED_OVERHEAD_HOUR);
        worksheet.setDeliveryKm(UPDATED_DELIVERY_KM);
        worksheet.setAccountSerialNumber(UPDATED_ACCOUNT_SERIAL_NUMBER);
        worksheet.setDescription(UPDATED_DESCRIPTION);
        worksheet.setUsedMaterial(UPDATED_USED_MATERIAL);
        worksheet.setTypeOfPayment(UPDATED_TYPE_OF_PAYMENT);
        worksheet.setWorkerSignature(UPDATED_WORKER_SIGNATURE);
        worksheet.setProofOfEmployment(UPDATED_PROOF_OF_EMPLOYMENT);
        return worksheet;
    }
}
