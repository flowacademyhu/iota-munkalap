package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailContainingOrFirstNameContainingOrLastNameContaining(String emailPart, String firstNamePart, String lastNamePart);
}
