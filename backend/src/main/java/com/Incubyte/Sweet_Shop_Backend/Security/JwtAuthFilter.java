package com.Incubyte.Sweet_Shop_Backend.Security;

import com.Incubyte.Sweet_Shop_Backend.Model.User;
import com.Incubyte.Sweet_Shop_Backend.Repo.UserRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {

        String header = req.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                String username = jwtUtil.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    User user = userRepo.findByUsername(username).orElse(null);

                    if (user != null && jwtUtil.validateToken(token, username)) {

                        SimpleGrantedAuthority authority =
                                new SimpleGrantedAuthority("ROLE_" + user.getRole());

                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                        username,
                                        null,
                                        List.of(authority)
                                );

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }

            } catch (Exception ignored) {
            }
        }
        chain.doFilter(req, res);
    }
}
