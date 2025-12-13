package com.Incubyte.Sweet_Shop_Backend.Controller;

import com.Incubyte.Sweet_Shop_Backend.Model.User;
import com.Incubyte.Sweet_Shop_Backend.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String token = authService.login(username, password);
        return Map.of("token", token);
    }
}

