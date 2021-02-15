package hu.flowacademy.worksheet.dto;

import hu.flowacademy.worksheet.enumCustom.AssetSettlement;
import hu.flowacademy.worksheet.enumCustom.TypeOfPayment;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorksheetDTO {
    //private Partner partner; szükséges lesz hozzá egy Partner osztály
    private TypeOfWork typeOfWork;
    private AssetSettlement assetSettlement;
    private WorkingTimeAccounting workingTimeAccounting;
    private int numberOfEmployees = 1;
    private float overheadHour;
    private float deliveryKm;
    private String accountSerialNumber;
    private String description;
    private String usedMaterial;
    private TypeOfPayment typeOfPayment;
    private String date;
    private String workerSignature;
    private String proofOfEmployment;
}
