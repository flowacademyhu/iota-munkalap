package hu.flowacademy.worksheet.entity;

import hu.flowacademy.worksheet.enumCustom.*;
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
    @Column(name = "worksheet_id")
    private String id;
    @Column(name="partner")
    private Partner partner;
    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_work")
    private TypeOfWork typeOfWork;
    @Enumerated(EnumType.STRING)
    @Column(name = "asset_settlement")
    private AssetSettlement assetSettlement;
    @Enumerated(EnumType.STRING)
    @Column(name = "working_time_accounting")
    private WorkingTimeAccounting workingTimeAccounting;
    @Column(name = "number_of_employees", columnDefinition = "int default 1")
    private int numberOfEmployees;
    @Column(name = "overhead_hour", columnDefinition = "float default 1.0")
    private float overheadHour;
    @Column(name = "delivery_km")
    private float deliveryKm;
    @Column(name = "account serial number", nullable = false)
    private String accountSerialNumber;
    @Lob
    @Column(name = "description")
    private String description;
    @Column(name = "used_material")
    private String usedMaterial;
    @Column(name = "tpye_of_payment")
    @Enumerated(EnumType.STRING)
    private TypeOfPayment typeOfPayment;
    @Column(name = "local_date_time")
    private String localDateTime;
    @Column(name = "worker_signature")
    private String workerSignature;
    @Column(name = "proof_of_employment")
    private String proofOfEmployment;
    @Enumerated(EnumType.STRING)
    private Status status;
}
