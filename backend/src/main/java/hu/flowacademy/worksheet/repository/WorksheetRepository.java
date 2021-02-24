package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
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
}