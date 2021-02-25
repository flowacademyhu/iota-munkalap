package hu.flowacademy.worksheet.service.filter;

import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.Optional;

public class WorksheetSpecification {

    public static final LocalDate MAX_TIME = LocalDate.of(2100, 12, 31);
    public static final LocalDate MIN_TIME = LocalDate.of(1970, 1, 1);

    public static Specification<Worksheet> createdAtBetween(Optional<LocalDate> maxTime, Optional<LocalDate> minTime) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), maxTime.orElse(MAX_TIME)), criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), minTime.orElse(MIN_TIME)));
    }

    public static Specification<Worksheet> enabled(Optional<WorksheetStatus> status) {
        return (root, query, criteriaBuilder) -> status
                .map(enabled -> criteriaBuilder.equal(root.get("worksheetStatus"), enabled))
                .orElse(null);
    }

    public static Specification<Worksheet> buildSpecification(Optional<WorksheetStatus> status, Optional<LocalDate> maxTime, Optional<LocalDate> minTime) {
        return Specification
                .where(createdAtBetween(maxTime, minTime))
                .and(enabled(status));
    }
}