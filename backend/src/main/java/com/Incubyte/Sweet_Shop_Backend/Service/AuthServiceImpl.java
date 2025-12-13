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
}
