package com.Incubyte.Sweet_Shop_Backend.Repo;

import com.Incubyte.Sweet_Shop_Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo  extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
}
