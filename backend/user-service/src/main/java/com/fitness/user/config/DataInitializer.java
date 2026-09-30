package com.fitness.user.config;

import com.fitness.user.entity.Role;
import com.fitness.user.entity.User;
import com.fitness.user.entity.UserProfile;
import com.fitness.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("tarun@example.com")) {
            User demoUser = User.builder()
                    .email("tarun@example.com")
                    .passwordHash(passwordEncoder.encode("Password123!"))
                    .firstName("Tarun")
                    .lastName("Sharma")
                    .role(Role.ROLE_USER)
                    .active(true)
                    .build();

            UserProfile profile = UserProfile.builder()
                    .user(demoUser)
                    .age(28)
                    .gender("MALE")
                    .heightCm(new BigDecimal("178.0"))
                    .weightKg(new BigDecimal("74.5"))
                    .targetWeightKg(new BigDecimal("72.0"))
                    .activityLevel("MODERATELY_ACTIVE")
                    .fitnessGoal("MUSCLE_GAIN")
                    .dietaryPreference("HIGH_PROTEIN")
                    .build();

            demoUser.setProfile(profile);
            userRepository.save(demoUser);
        }
    }
}