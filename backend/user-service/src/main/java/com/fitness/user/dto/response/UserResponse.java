package com.fitness.user.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private Integer age;
    private String gender;
    private BigDecimal heightCm;
    private BigDecimal weightKg;
    private BigDecimal targetWeightKg;
    private String activityLevel;
    private String fitnessGoal;
    private String dietaryPreference;
}
