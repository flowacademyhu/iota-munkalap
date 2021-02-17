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

    private static final String WORKSHEET_ID = "Munkalap_id1";
    private static final String PARTNER_ID = "Partner_id1";
    private static final TypeOfWork TYPE_OF_WORK = INSTALLATION;
    //private static final TypeOfWork TYPE_OF_WORK_OTHER = OTHER;
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

    private static final String UPDATED_WORKSHEET_ID = "MunkalapIdUpdated";
    private static final String UPDATED_PARTNER_ID = "PartnerIdUpdated";
    private static final TypeOfWork UPDATED_TYPE_OF_WORK = REPAIR;
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

    @InjectMocks
    private WorksheetService worksheetService;

    @Test
    public void givenNewWorksheet_whenSavingWorksheet_ThenGreatSuccess() throws ValidationException {
        var worksheet = givenValidWorksheet();
        when(worksheetRepository.save(any())).thenReturn(Worksheet.builder()
                .id(worksheet.getId())
                .partnerId(PARTNER_ID)
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
    public void givenNewWorksheetObject_whenUpdateWorksheet_thenWorksheetUpdated() throws ValidationException {
        givenExistingWorksheetWhenUpdate();
        Worksheet newWorksheet = givenUpdateProperWorksheetObject();
        Worksheet updatedWorksheet = worksheetService.update(WORKSHEET_ID, newWorksheet);

        Mockito.verify(worksheetRepository, times(1)).save(updatedWorksheet);
        assertThat(updatedWorksheet, notNullValue());
        assertThat(updatedWorksheet.getPartnerId(), is(newWorksheet.getPartnerId()));
        assertThat(updatedWorksheet.getTypeOfWork(), is(newWorksheet.getTypeOfWork()));
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
        Worksheet worksheet = givenValidWorksheet();
        when(worksheetRepository.findById(WORKSHEET_ID)).thenReturn(Optional.of(worksheet));
        when(worksheetRepository.save(any(Worksheet.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private void givenExistingWorksheetWhenUpdate() {
        Worksheet worksheet = givenValidWorksheet();
        worksheet.setId(WORKSHEET_ID);
        when(worksheetRepository.findById(WORKSHEET_ID)).thenReturn(Optional.of(worksheet));
        when(worksheetRepository.save(any(Worksheet.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private Worksheet givenValidWorksheet() {
        return Worksheet.builder()
                .partnerId(PARTNER_ID)
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

    private Worksheet givenUpdateProperWorksheetObject() {
        Worksheet worksheet = new Worksheet();
        worksheet.setId(UPDATED_WORKSHEET_ID);
        worksheet.setPartnerId(UPDATED_PARTNER_ID);
        worksheet.setTypeOfWork(UPDATED_TYPE_OF_WORK);
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
