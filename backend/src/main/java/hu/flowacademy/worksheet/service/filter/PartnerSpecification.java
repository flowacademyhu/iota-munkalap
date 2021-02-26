package hu.flowacademy.worksheet.service.filter;

import hu.flowacademy.worksheet.entity.Partner;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public class PartnerSpecification {
    public static Specification<Partner> nevOrAdoszamContains(Optional<String> q) {
        return (root, query, criteriaBuilder) -> q
                .map(
                        searchParam -> criteriaBuilder.or(
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("nev")), searchParam),
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("adoszam")), searchParam)
                        )
                )
                .orElse(null);
    }

    public static Specification<Partner> buildSpecification(Optional<String> q) {
        return Specification
                .where(nevOrAdoszamContains(
                        q.map(searchPart -> "%" + searchPart.toLowerCase().replaceAll("[aáeéiíoóöőuúüű]", "_") + "%")
                        )
                );
    }
}