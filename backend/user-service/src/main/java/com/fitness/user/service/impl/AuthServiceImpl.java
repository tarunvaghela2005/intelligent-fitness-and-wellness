package com.fitness.user.service.impl;

import com.fitness.user.dto.request.LoginRequest;
import com.fitness.user.dto.request.RegisterRequest;
import com.fitness.user.dto.response.AuthResponse;
import com.fitness.user.entity.Role;
import com.fitness.user.entity.User;
import com.fitness.user.entity.UserProfile;
import com.fitness.user.exception.ResourceNotFoundException;
import com.fitness.user.exception.UserAlreadyExistsException;
import com.fitness.user.repository.UserRepository;
import com.fitness.user.security.JwtTokenProvider;
import com.fitness.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email is already registered");
        }

        User user = User.builder()
                .email(request.getEmail().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.ROLE_USER)
                .active(true)
                .build();

        UserProfile profile = UserProfile.builder()
                .user(user)
                .age(request.getAge())
                .gender(request.getGender())
                .heightCm(request.getHeightCm())
                .weightKg(request.getWeightKg())
                .targetWeightKg(request.getTargetWeightKg())
                .activityLevel(request.getActivityLevel())
                .fitnessGoal(request.getFitnessGoal())
                .dietaryPreference(request.getDietaryPreference())
                .build();

        user.setProfile(profile);
        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser);

        return AuthResponse.builder()
                .token(token)
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .role(savedUser.getRole().name())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }
}
