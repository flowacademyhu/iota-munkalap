package hu.flowacademy.worksheet.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import hu.flowacademy.worksheet.enumCustom.Role;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder(toBuilder = true)
@Table(name = "userCustom")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    @Column(unique = true, nullable = false)
    @NonNull
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Transient
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean enabled;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "nameOfTheCreator")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Worksheet> orderList;
}
