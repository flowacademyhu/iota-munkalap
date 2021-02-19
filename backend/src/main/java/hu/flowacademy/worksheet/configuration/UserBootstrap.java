package hu.flowacademy.worksheet.configuration;

import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Component
public class UserBootstrap implements CommandLineRunner {

    public static final String SUPERADMIN_EMAIL = "superadmin@superadmin.hu";
    public static final String SUPERADMIN = "Superadmin";
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        userRepository.findFirstByEmail(SUPERADMIN_EMAIL)
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(SUPERADMIN_EMAIL)
                        .firstName(SUPERADMIN)
                        .lastName(SUPERADMIN)
                        .build()));
    }
}
