package hu.flowacademy.worksheet.service.filter;
import hu.flowacademy.worksheet.entity.User;
import org.springframework.data.jpa.domain.Specification;
import java.util.Optional;
public class UserSpecification {
    public static Specification<User> firstnameLastnameEmailContains(Optional<String> q) {
        return (root, query, criteriaBuilder) -> q
                .map(
                        // TODO check ignore case
                        searchParam -> criteriaBuilder.or(
                                criteriaBuilder.like(root.get("firstName"), searchParam),
                                criteriaBuilder.like(root.get("lastName"), searchParam),
                                criteriaBuilder.like(root.get("email"), searchParam)
                        )
                )
                .orElse(null);
    }
    public static Specification<User> enabled(Optional<Boolean> status) {
        return (root, query, criteriaBuilder) -> status
                .map(enabled -> criteriaBuilder.equal(root.get("enabled"), enabled))
                .orElse(null);
    }

    public static Specification<User> buildSpecification(Optional<Boolean> status, Optional<String> q) {
        return Specification
                .where(enabled(status))
                .and(firstnameLastnameEmailContains(
                        q.map(searchPart -> "%" + searchPart.replaceAll("[aáeéiíoóöőuúüű]", "_") + "%")
                        )
                );
    }
}