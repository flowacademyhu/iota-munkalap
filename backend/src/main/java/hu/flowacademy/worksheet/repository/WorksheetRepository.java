package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.Worksheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface WorksheetRepository extends JpaRepository<Worksheet, String>, JpaSpecificationExecutor<Worksheet> {
}