package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.WorksheetRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class WorksheetService {

    private final WorksheetRepository worksheetRepository;

    public Worksheet saveWorksheet(@NonNull Worksheet worksheet) throws ValidationException {
        validateWorksheet(worksheet);
        worksheet.setWorksheetStatus(WorksheetStatus.CREATED);
        worksheet.setCreatedAt(LocalDateTime.now());
        return worksheetRepository.save(worksheet);
    }

    private void validateWorksheet(Worksheet worksheet) throws ValidationException {
        if (worksheet.getPartnerId() == null) {
            throw new ValidationException("Partner value is null");
        }
        if (worksheet.getTypeOfWork() == null) {
            throw new ValidationException("Type of work value is null");
        }
        if (worksheet.getTypeOfWork() != TypeOfWork.OTHER && StringUtils.hasText(worksheet.getCustomTypeOfWork())) {
            throw new ValidationException("Type Of Work Other value is null or empty String.");
        }
        if (worksheet.getAssetSettlement() == null) {
            throw new ValidationException("Asset settlement value is null");
        }
        if (worksheet.getWorkingTimeAccounting() == null) {
            throw new ValidationException("Working Time Accounting value is null");
        }
        if (worksheet.getNumberOfEmployees() < 1) {
            throw new ValidationException("The number of employees less then 1");
        }
        if (worksheet.getOverheadHour() < 1.0) {
            throw new ValidationException("The overhead hour less then 1");
        }
        if (worksheet.getDeliveryKm() < 0) {
            throw new ValidationException("The delivery km less then 0");
        }
        if (!StringUtils.hasText(worksheet.getDescription())) {
            throw new ValidationException("Description is empty or null");
        }
        if (!StringUtils.hasText(worksheet.getUsedMaterial())) {
            throw new ValidationException("UsedMaterial is empty or null");
        }
        if (worksheet.getTypeOfWork() == null) {
            throw new ValidationException("Type of work value is null");
        }
        if (worksheet.getWorkerSignature() == null) {
            throw new ValidationException("Worker signature value is null");
        }
        if (worksheet.getProofOfEmployment() == null) {
            throw new ValidationException("Proof of Employment value is null");
        }
    }

    public Worksheet setStatusWorksheet(String id, WorksheetStatus status) throws ValidationException {
        Worksheet toChange = worksheetRepository.findById(id).orElseThrow(() -> new ValidationException("No worksheet found with provided id."));
        toChange.setWorksheetStatus(status);
        return worksheetRepository.save(toChange);
    }

    public Worksheet update(String id, Worksheet worksheetReceived) throws ValidationException {
        validateUpdatedWorksheet(worksheetReceived);
        Worksheet worksheetToUpdate = worksheetRepository.findById(id).orElseThrow(() -> new ValidationException("No worksheet with the given id " + worksheetReceived.getId()));
        return addedWorksheet(worksheetReceived, worksheetToUpdate);
    }

    private void validateUpdatedWorksheet(Worksheet worksheet) throws ValidationException {
        if (worksheet.getPartnerId() == null) {
            throw new ValidationException("Partner value is null");
        }
        if (worksheet.getTypeOfWork() == null) {
            throw new ValidationException("Type of work value is null");
        }
        if (worksheet.getTypeOfWork() != TypeOfWork.OTHER && StringUtils.hasText(worksheet.getCustomTypeOfWork())) {
            throw new ValidationException("Type Of Work Other value is null or empty String.");
        }
        if (worksheet.getAssetSettlement() == null) {
            throw new ValidationException("Asset settlement value is null");
        }
        if (worksheet.getWorkingTimeAccounting() == null) {
            throw new ValidationException("Working Time Accounting value is null");
        }
        if (worksheet.getNumberOfEmployees() < 1) {
            throw new ValidationException("The number of employees less then 1");
        }
        if (worksheet.getOverheadHour() < 1.0) {
            throw new ValidationException("The overhead hour less then 1");
        }
        if (worksheet.getDeliveryKm() < 0) {
            throw new ValidationException("The delivery km less then 0");
        }
        if (!StringUtils.hasText(worksheet.getDescription())) {
            throw new ValidationException("Description is empty or null");
        }
        if (!StringUtils.hasText(worksheet.getUsedMaterial())) {
            throw new ValidationException("UsedMaterial is empty or null");
        }
        if (worksheet.getWorkerSignature() == null) {
            throw new ValidationException("Worker signature value is null");
        }
        if (worksheet.getProofOfEmployment() == null) {
            throw new ValidationException("Proof of Employment value is null");
        }
    }

    private Worksheet addedWorksheet(Worksheet worksheetReceived, Worksheet worksheetToUpdate) throws ValidationException {
        validateUpdatedWorksheet(worksheetReceived);
        worksheetToUpdate.setPartnerId(worksheetReceived.getPartnerId());
        worksheetToUpdate.setTypeOfWork(worksheetReceived.getTypeOfWork());
        worksheetToUpdate.setCustomTypeOfWork(worksheetReceived.getCustomTypeOfWork());
        worksheetToUpdate.setAssetSettlement(worksheetReceived.getAssetSettlement());
        worksheetToUpdate.setWorkingTimeAccounting(worksheetReceived.getWorkingTimeAccounting());
        worksheetToUpdate.setNumberOfEmployees(worksheetReceived.getNumberOfEmployees());
        worksheetToUpdate.setOverheadHour(worksheetReceived.getOverheadHour());
        worksheetToUpdate.setDeliveryKm(worksheetReceived.getDeliveryKm());
        worksheetToUpdate.setAccountSerialNumber(worksheetReceived.getAccountSerialNumber());
        worksheetToUpdate.setDescription(worksheetReceived.getDescription());
        worksheetToUpdate.setUsedMaterial(worksheetReceived.getUsedMaterial());
        worksheetToUpdate.setTypeOfPayment(worksheetReceived.getTypeOfPayment());
        worksheetToUpdate.setWorkerSignature(worksheetReceived.getWorkerSignature());
        worksheetToUpdate.setProofOfEmployment(worksheetReceived.getProofOfEmployment());
        return worksheetRepository.save(worksheetToUpdate);
    }
}
