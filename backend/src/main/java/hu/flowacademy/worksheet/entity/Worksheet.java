package hu.flowacademy.worksheet.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.flowacademy.worksheet.enumCustom.*;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private Long id;
    @Column(name = "partner_id")
    private String partnerId; // FIXME Change to many to one in the future.
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
    @Column(name = "account_serial_number", nullable = false) //NULLABLE JAVÍTÁS
    private String accountSerialNumber;
    @Lob
    @Column(name = "description")
    private String description;
    @Column(name = "used_material")
    private String usedMaterial;
    @Column(name = "type_of_payment")
    @Enumerated(EnumType.STRING)
    private TypeOfPayment typeOfPayment;
    @Column(name = "local_date_time")
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss")
    private LocalDateTime localDateTime;
    @Column(name = "worker_signature")
    private String workerSignature;
    @Column(name = "proof_of_employment")
    private String proofOfEmployment;
    @Enumerated(EnumType.STRING)
    private WorksheetStatus worksheetStatus;
}
