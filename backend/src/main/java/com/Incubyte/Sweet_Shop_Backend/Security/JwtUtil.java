package com.Incubyte.Sweet_Shop_Backend.Security;

import com.Incubyte.Sweet_Shop_Backend.Model.User;
import com.Incubyte.Sweet_Shop_Backend.Repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "replace_with_very_long_secret_at_least_32_chars!";
    private static final long EXPIRATION_MS = 1000L * 60 * 60 * 10; // 10 hours

    @Autowired
    private UserRepo userRepo;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        // Fetch user to get the role
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Date now = new Date();
        Date exp = new Date(now.getTime() + EXPIRATION_MS);
        
        return Jwts.builder()
                .subject(username)  // Changed from setSubject
                .claim("role", user.getRole())
                .issuedAt(now)  // Changed from setIssuedAt
                .expiration(exp)  // Changed from setExpiration
                .signWith(getSigningKey())  // No need for algorithm parameter
                .compact();
    }

    public Claims getAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())  // Changed from setSigningKey
                .build()
                .parseSignedClaims(token)  // Changed from parseClaimsJws
                .getPayload();  // Changed from getBody
    }

    public String extractUsername(String token) {
        return getAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return getAllClaims(token).get("role", String.class);
    }

    public boolean isExpired(String token) {
        return getAllClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isExpired(token);
    }
}