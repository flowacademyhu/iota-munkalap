package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByEmailLikeIgnoreCaseOrFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(String emailPart, String firstNamePart, String lastNamePart, Pageable pageable);

    User findFirstByEmail(String email);

}
