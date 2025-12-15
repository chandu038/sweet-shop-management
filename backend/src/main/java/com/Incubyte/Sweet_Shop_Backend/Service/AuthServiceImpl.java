package com.Incubyte.Sweet_Shop_Backend.Service;

import com.Incubyte.Sweet_Shop_Backend.Model.User;
import com.Incubyte.Sweet_Shop_Backend.Repo.UserRepo;
import com.Incubyte.Sweet_Shop_Backend.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public User register(User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));

        // If no role provided default to USER
        if (user.getRole() == null) {
            user.setRole("USER");
        }

        return userRepo.save(user);
    }

    @Override
    public String login(String username, String password) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(username);
    }
    
public User registercheck(User user) {
    System.out.println("=== REGISTER DEBUG ===");
    System.out.println("Received role: " + user.getRole());
    
    if (userRepo.findByUsername(user.getUsername()).isPresent()) {
        throw new RuntimeException("Username already exists");
    }

    user.setPassword(encoder.encode(user.getPassword()));
    if (user.getRole() == null || user.getRole().isEmpty()) {
        System.out.println("Role was null/empty, setting to USER");
        user.setRole("USER");
    } else {
        System.out.println("Role is: " + user.getRole());
    }
    
    User savedUser = userRepo.save(user);
    System.out.println("Saved user role: " + savedUser.getRole());
    System.out.println("=== END DEBUG ===");
    
    return savedUser;
}

public String logincheck(String username, String password) {
    System.out.println("=== LOGIN DEBUG ===");
    System.out.println("Login attempt for: " + username);
    
    User user = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println("Found user - Role: " + user.getRole());
    
    if (!encoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    String token = jwtUtil.generateToken(username);
    System.out.println("Generated token for: " + username);
    System.out.println("=== END LOGIN DEBUG ===");
    
    return token;
}

}
