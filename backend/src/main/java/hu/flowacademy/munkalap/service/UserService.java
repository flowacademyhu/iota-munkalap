package hu.flowacademy.munkalap.service;

import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.enumCustom.Kind;
import hu.flowacademy.munkalap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.xml.bind.ValidationException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        Objects.requireNonNull(user);

        validateUser(user);

        user.setKind(Kind.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    private void validateUser(User user) {
        if(!(StringUtils.hasText(user.getName()))) {
            throw new ValidationException()
        }

    }
}

/* public Food createFood(Food food) throws ValidationException {
        log.info("Creating adding food: {}", food);
        if (!(StringUtils.hasText(food.getName()) && food.getPrice() >= 0)) {
            throw new ValidationException("Price is negative or no Food Name", HttpStatus.BAD_REQUEST);
        } else {
            Food created = foodRepository.save(food);
            log.info("Created food: {}", created);
            return created;
        }
    }*/