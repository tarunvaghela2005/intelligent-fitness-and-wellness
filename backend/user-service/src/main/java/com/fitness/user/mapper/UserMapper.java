package com.fitness.user.mapper;

import com.fitness.user.dto.response.UserResponse;
import com.fitness.user.entity.User;
import com.fitness.user.entity.UserProfile;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        UserProfile profile = user.getProfile();
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .age(profile != null ? profile.getAge() : null)
                .gender(profile != null ? profile.getGender() : null)
                .heightCm(profile != null ? profile.getHeightCm() : null)
                .weightKg(profile != null ? profile.getWeightKg() : null)
                .targetWeightKg(profile != null ? profile.getTargetWeightKg() : null)
                .activityLevel(profile != null ? profile.getActivityLevel() : null)
                .fitnessGoal(profile != null ? profile.getFitnessGoal() : null)
                .dietaryPreference(profile != null ? profile.getDietaryPreference() : null)
                .build();
    }
}
