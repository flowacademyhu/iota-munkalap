package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.regex.Pattern;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailLikeIgnoreCaseOrFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(String emailPart, String firstNamePart, String lastNamePart);
}
