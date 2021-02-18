package hu.flowacademy.worksheet.service;

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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import static hu.flowacademy.worksheet.enumCustom.AssetSettlement.WARRANTY;
import static hu.flowacademy.worksheet.enumCustom.TypeOfPayment.*;
import static hu.flowacademy.worksheet.enumCustom.TypeOfWork.OTHER;
import static hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorksheetServiceTest {

    private static final String WORKSHEET_ID = "Munkalap_id1";
    private static final TypeOfWork TYPE_OF_WORK = OTHER;
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

    @Mock
    private WorksheetRepository worksheetRepository;

    @InjectMocks
    private WorksheetService worksheetService;

    @Test
    public void givenNewWorksheet_whenSavingWorksheet_ThenGreatSuccess() throws ValidationException {
        var worksheet = givenValidWorksheet();
        when(worksheetRepository.save(any())).thenReturn(Worksheet.builder()
                .id(worksheet.getId())
                .partnerId(WORKSHEET_ID)
                .typeOfWork(TYPE_OF_WORK)
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
        givenExistingWorksheet();
        Worksheet result = worksheetService.setStatusWorksheet(WORKSHEET_ID, WorksheetStatus.CLOSED);
        Mockito.verify(worksheetRepository, times(1)).save(result);
        assertThat(result, notNullValue());
        assertThat(result.getWorksheetStatus(), notNullValue());
        assertThat(result.getWorksheetStatus(), is(WorksheetStatus.CLOSED));
    }

    @Test
    public void givenAProperWorksheet_whenFilteringByDate_thenReturnItemInList() {
        givenAProperTimedWorkSheet();
        List<Worksheet> result = worksheetService.findByTimeInterval(MAX_TIME, MIN_TIME);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
        LocalDateTime dateTimeMax = LocalDateTime.parse(MAX_TIME, formatter);
        LocalDateTime dateTimeMin = LocalDateTime.parse(MIN_TIME, formatter);
        Mockito.verify(worksheetRepository, times(1))
                .findByCreatedAtBetween(dateTimeMin, dateTimeMax);
        assertThat(result.get(0).getId(), is(WORKSHEET_ID));
        assertThat(result.get(0).getPartnerId(), is(WORKSHEET_ID));
        assertThat(result.size(), is(1));
    }

    private void givenExistingWorksheet() {
        Worksheet worksheet = givenValidWorksheet();
        when(worksheetRepository.findById(WORKSHEET_ID)).thenReturn(Optional.of(worksheet));
        when(worksheetRepository.save(any(Worksheet.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private void givenAProperTimedWorkSheet() {
        Worksheet worksheet = givenValidWorksheet();
        worksheet.setId(WORKSHEET_ID);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
        LocalDateTime dateTimeMax = LocalDateTime.parse(MAX_TIME, formatter);
        LocalDateTime dateTimeMin = LocalDateTime.parse(MIN_TIME, formatter);
        when(worksheetRepository.findByCreatedAtBetween(dateTimeMin, dateTimeMax)).thenReturn(List.of(worksheet));
    }

    private Worksheet givenValidWorksheet() {
        return Worksheet.builder()
                .partnerId(WORKSHEET_ID)
                .typeOfWork(TYPE_OF_WORK)
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
}
