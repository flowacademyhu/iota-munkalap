package hu.flowacademy.munkalap.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.flowacademy.munkalap.enumCustom.Kind;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_custom")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String email;
    private Kind kind;
    //private String password;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm:sss")
    private Date createdAt;

}

//TODO MYSQL / no H2, Change.