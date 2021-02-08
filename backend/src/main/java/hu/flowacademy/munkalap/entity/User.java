package hu.flowacademy.munkalap.entity;

import hu.flowacademy.munkalap.enumCustom.Kind;

import javax.persistence.*;

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


}

//TODO MYSQL / no H2, Change.