package hu.flowacademy.worksheet.entity;

import hu.flowacademy.worksheet.enumCustom.AssetSettlement;
import hu.flowacademy.worksheet.enumCustom.TypeOfPayment;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorkingTimeAccounting;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "worksheetCustom")
public class Worksheet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //@NonNull
    //private Partner partner; szükséges lesz hozzá egy Partner osztály
    @Enumerated(EnumType.STRING)
    @NonNull
    private TypeOfWork typeOfWork;
    @Enumerated(EnumType.STRING)
    @NonNull
    private AssetSettlement assetSettlement;
    @Enumerated(EnumType.STRING)
    @NonNull
    private WorkingTimeAccounting workingTimeAccounting;
    @NonNull
    private int numberOfEmployees = 1;
    @NonNull
    private float overheadHour;
    @NonNull
    private float deliveryKm;
    private String accountSerialNumber;
    @NonNull
    @Lob
    private String description;
    @NonNull
    private String usedMaterial;
    @NonNull
    @Enumerated(EnumType.STRING)
    private TypeOfPayment typeOfPayment;
    @NonNull
    private String date;
    @NonNull
    private String workerSignature;
    @NonNull
    private String proofOfEmployment;

}

// Nem tudom, hogy az e-aláírások, hogyan lesznek tárolva, milyen típusban, egyelőre Stringnek állítottam!