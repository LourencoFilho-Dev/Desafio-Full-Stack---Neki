package com.neki.skillmanagement.controller;

import com.neki.skillmanagement.model.User;
import com.neki.skillmanagement.service.AuthService;
import com.neki.skillmanagement.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getLogin(), user.getPassword()));
            Optional<User> userOptional = authService.authenticate(user.getLogin(), user.getPassword());
            if (userOptional.isPresent()) {
                String token = jwtUtil.generateToken(userOptional.get());
                return ResponseEntity.ok().body(token);
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (authService.register(user.getLogin(), user.getPassword()) != null) {
            return ResponseEntity.ok().body("User registered successfully");
        } else {
            return ResponseEntity.status(400).body("Registration failed");
        }
    }
}

