package hu.flowacademy.munkalap.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.flowacademy.munkalap.enumCustom.Kind;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "user_custom")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String email;
    private Kind kind;
    private String password;
    private boolean enabled;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm:sss")
    private LocalDateTime createdAt;
}