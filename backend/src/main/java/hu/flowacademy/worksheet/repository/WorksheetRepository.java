package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorksheetRepository extends JpaRepository<Worksheet, String>, JpaSpecificationExecutor<Worksheet> {
    @Modifying
    @Query("update Worksheet w set w.worksheetStatus = ?2 where w.id = ?1")
    void updateWorksheetstatus(String id, WorksheetStatus status);

    @Modifying
    @Query("update Worksheet w set w.partnerId = ?2 where w.id = ?1")
    void updateWorksheetPartner(String id, String partnerId);

    @Modifying
    @Query("update Worksheet w set w.typeOfWork = ?2 where w.id = ?1")
    void updateWorksheetTypeOfWork(String id, TypeOfWork typeOfWork);

    @Modifying
    @Query("update Worksheet w set w.customTypeOfWork = ?2 where w.id = ?1")
    void updateWorksheetCustomTypeOfWork(String id, String customTypeOfWork);

    @Modifying
    @Query("update Worksheet w set w.assetSettlement = ?2 where w.id = ?1")
    void updateWorksheetAssetSettlement(String id, AssetSettlement assetSettlement);

    @Modifying
    @Query("update Worksheet w set w.workingTimeAccounting = ?2 where w.id = ?1")
    void updateWorksheetWorkingTimeAccounting(String id, WorkingTimeAccounting workingTimeAccounting);

    @Modifying
    @Query("update Worksheet w set w.numberOfEmployees = ?2 where w.id = ?1")
    void updateWorksheetNumberOfEmployees(String id, int numberOfEmployees);

    @Modifying
    @Query("update Worksheet w set w.overheadHour = ?2 where w.id = ?1")
    void updateWorksheetOverheadHour(String id, float overheadHour);

    @Modifying
    @Query("update Worksheet w set w.deliveryKm = ?2 where w.id = ?1")
    void updateWorksheetDeliveryKm(String id, float deliveryKm);

    @Modifying
    @Query("update Worksheet w set w.accountSerialNumber = ?2 where w.id = ?1")
    void updateWorksheetAccountSerialNumber(String id, String accountSerialNumber);

    @Modifying
    @Query("update Worksheet w set w.description = ?2 where w.id = ?1")
    void updateWorksheetDescription(String id, String description);

    @Modifying
    @Query("update Worksheet w set w.usedMaterial = ?2 where w.id = ?1")
    void updateWorksheetUsedMaterial(String id, String usedMaterial);

    @Modifying
    @Query("update Worksheet w set w.typeOfPayment = ?2 where w.id = ?1")
    void updateWorksheetTypeOfPayment(String id, TypeOfPayment typeOfPayment);

    @Modifying
    @Query("update Worksheet w set w.workerSignature = ?2 where w.id = ?1")
    void updateWorksheetWorkerSignature(String id, byte[] workerSignature);

    @Modifying
    @Query("update Worksheet w set w.proofOfEmployment = ?2 where w.id = ?1")
    void updateWorksheetProofOfEmployment(String id, byte[] proofOfEmployment);
}