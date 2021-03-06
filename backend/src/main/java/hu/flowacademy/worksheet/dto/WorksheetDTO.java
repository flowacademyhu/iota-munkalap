package hu.flowacademy.worksheet.dto;

import hu.flowacademy.worksheet.enumCustom.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorksheetDTO {
    private String id;
    private String partnerId;
    private String partnerName;
    private TypeOfWork typeOfWork;
    private String customTypeOfWork;
    private AssetSettlement assetSettlement;
    private WorkingTimeAccounting workingTimeAccounting;
    private int numberOfEmployees;
    private float overheadHour;
    private float deliveryKm;
    private String accountSerialNumber;
    private String description;
    private String usedMaterial;
    private TypeOfPayment typeOfPayment;
    private LocalDate createdAt;
    private String workerSignature;
    private String proofOfEmployment;
    private WorksheetStatus worksheetStatus;
    private String createdBy;
}
