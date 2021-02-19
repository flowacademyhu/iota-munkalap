package hu.flowacademy.worksheet.configuration;

import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@Configuration
@RequiredArgsConstructor
public class AuditConfiguration {
    private final UserRepository userRepository;

    @Bean
    public AuditorAware<User> auditorAware() {
        return new SpringSecurityAuditorAware(userRepository);
    }
}