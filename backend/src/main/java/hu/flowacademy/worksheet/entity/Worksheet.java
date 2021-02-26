package hu.flowacademy.worksheet.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.flowacademy.worksheet.enumCustom.*;
import hu.flowacademy.worksheet.generator.WorksheetSerialGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "worksheetCustom")
@EntityListeners(AuditingEntityListener.class)
public class Worksheet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "secondaryIdGenerator")
    @GenericGenerator(
            name = "secondaryIdGenerator",
            strategy = "hu.flowacademy.worksheet.generator.WorksheetSerialGenerator",
            parameters = {
                    @Parameter(name = WorksheetSerialGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d"),
                    @Parameter(name = "initial_value", value = "10000")
            })
    @Column(name = "worksheet_id", nullable = false)
    private String id;
    @Column(name = "partner_id")
    private String partnerId; // FIXME Change to many to one in the future.
    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_work", nullable = false)
    private TypeOfWork typeOfWork;
    @Lob()
    @Column(name = "custom_type_of_work", length = 3000)
    private String customTypeOfWork;
    @Enumerated(EnumType.STRING)
    @Column(name = "asset_settlement", nullable = false)
    private AssetSettlement assetSettlement;
    @Enumerated(EnumType.STRING)
    @Column(name = "working_time_accounting", nullable = false)
    private WorkingTimeAccounting workingTimeAccounting;
    @Column(name = "number_of_employees", columnDefinition = "int default 1", nullable = false)
    private int numberOfEmployees;
    @Column(name = "overhead_hour", columnDefinition = "float default 1.0", nullable = false)
    private float overheadHour;
    @Column(name = "delivery_km", nullable = false)
    private float deliveryKm;
    @Column(name = "account_serial_number")
    private String accountSerialNumber;
    @Lob
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "used_material", nullable = false)
    private String usedMaterial;
    @Column(name = "type_of_payment", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeOfPayment typeOfPayment;
    @Column(name = "createdAtRealTime", nullable = false)
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss")
    private LocalDateTime createdAtRealTime;
    @Column(name = "createdAt", nullable = false)
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate createdAt;
    @Lob
    @Column(name = "worker_signature", columnDefinition = "LONGBLOB", nullable = false)
    private byte[] workerSignature;
    @Lob
    @Column(name = "proof_of_employment", columnDefinition = "LONGBLOB", nullable = false)
    private byte[] proofOfEmployment;
    @Enumerated(EnumType.STRING)
    private WorksheetStatus worksheetStatus;
    @CreatedBy
    @ManyToOne
    @JoinColumn(nullable = false)
    private User createdBy;
}
