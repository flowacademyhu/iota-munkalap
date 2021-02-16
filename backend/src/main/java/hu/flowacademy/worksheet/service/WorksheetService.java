package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.WorksheetRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class WorksheetService {

    private final WorksheetRepository worksheetRepository;

    public Worksheet saveWorksheet(@NonNull Worksheet worksheet) throws ValidationException {
        validateWorksheet(worksheet);
        worksheet.setWorksheetStatus(WorksheetStatus.CREATED);
        return worksheetRepository.save(worksheet);
    }

    private void validateWorksheet(Worksheet worksheet) throws ValidationException {
        if (worksheet.getPartner() == null) {
            throw new ValidationException("Partner value is null");
        }
        if (worksheet.getTypeOfWork() == null) {
            throw new ValidationException("Type of work value is null");
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
        if (worksheet.getWorksheetStatus() == null) {
            throw new ValidationException("Worksheet status value is null");
        }
    }
}
