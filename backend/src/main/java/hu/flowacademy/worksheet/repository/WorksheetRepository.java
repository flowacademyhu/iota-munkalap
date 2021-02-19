package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorksheetRepository extends JpaRepository<Worksheet, String> {
    List<Worksheet> findByWorksheetStatusLike(WorksheetStatus status);
}
