package com.Incubyte.Sweet_Shop_Backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false) 
    private String username;
    @Column(nullable = false)
    private String password;
    private String role; // "USER" or "ADMIN"
}
