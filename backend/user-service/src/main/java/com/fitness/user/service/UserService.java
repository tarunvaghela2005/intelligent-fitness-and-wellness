package com.fitness.user.service;

import com.fitness.user.dto.UserProfileDto;
import com.fitness.user.model.User;
import com.fitness.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final HealthDiagnosticsService healthDiagnosticsService;

    public UserProfileDto getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.findAll().stream().findFirst()
                        .orElseThrow(() -> new RuntimeException("User not found")));
        return mapToDto(user);
    }

    public UserProfileDto updateUserProfile(String email, UserProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.findAll().stream().findFirst()
                        .orElseThrow(() -> new RuntimeException("User not found")));

        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getAge() != null) user.setAge(dto.getAge());
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getHeight() != null) user.setHeight(dto.getHeight());
        if (dto.getWeight() != null) user.setWeight(dto.getWeight());
        if (dto.getActivityLevel() != null) user.setActivityLevel(dto.getActivityLevel());
        if (dto.getFitnessGoal() != null) user.setFitnessGoal(dto.getFitnessGoal());

        User updated = userRepository.save(user);
        healthDiagnosticsService.calculateAndSaveMetrics(updated);

        return mapToDto(updated);
    }

    public User getEntityByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.findAll().stream().findFirst().orElse(null));
    }

    private UserProfileDto mapToDto(User user) {
        return UserProfileDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .age(user.getAge())
                .gender(user.getGender())
                .height(user.getHeight())
                .weight(user.getWeight())
                .activityLevel(user.getActivityLevel())
                .fitnessGoal(user.getFitnessGoal())
                .build();
    }
}
