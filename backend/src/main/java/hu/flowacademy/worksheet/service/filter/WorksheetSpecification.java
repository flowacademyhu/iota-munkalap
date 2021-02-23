package hu.flowacademy.worksheet.service.filter;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Optional;

public class WorksheetSpecification {
    public static Specification<Worksheet> createdAtBetween(Optional<LocalDateTime> maxTime, Optional<LocalDateTime> minTime) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("createdAt"), minTime.orElse(LocalDateTime.MAX), maxTime.orElse(LocalDateTime.MIN));
    }

    public static Specification<Worksheet> enabled(Optional<WorksheetStatus> status) {
        return (root, query, criteriaBuilder) -> status
                .map(enabled -> criteriaBuilder.equal(root.get("worksheetStatus"), enabled))
                .orElse(null);
    }

    public static Specification<Worksheet> buildSpecification(Optional<WorksheetStatus> status, Optional<LocalDateTime> maxTime, Optional<LocalDateTime> minTime) {
        return Specification
                .where(createdAtBetween(maxTime, minTime))
                .and(enabled(status));
    }
}