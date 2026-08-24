package com.fitness.user.service;

import com.fitness.user.dto.*;
import com.fitness.user.model.User;
import com.fitness.user.repository.UserRepository;
import com.fitness.user.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final HealthDiagnosticsService healthDiagnosticsService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email address already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .age(request.getAge() != null ? request.getAge() : 25)
                .gender(request.getGender() != null ? request.getGender() : "MALE")
                .height(request.getHeight() != null ? request.getHeight() : 175.0)
                .weight(request.getWeight() != null ? request.getWeight() : 70.0)
                .activityLevel(request.getActivityLevel() != null ? request.getActivityLevel() : "MODERATELY_ACTIVE")
                .fitnessGoal(request.getFitnessGoal() != null ? request.getFitnessGoal() : "WEIGHT_LOSS")
                .build();

        User savedUser = userRepository.save(user);
        healthDiagnosticsService.calculateAndSaveMetrics(savedUser);

        String token = jwtTokenProvider.generateToken(savedUser.getEmail());

        return AuthResponse.builder()
                .token(token)
                .userId(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
