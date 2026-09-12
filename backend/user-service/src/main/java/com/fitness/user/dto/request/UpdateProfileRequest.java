package com.fitness.user.dto.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    private Integer age;
    private String gender;
    private BigDecimal heightCm;
    private BigDecimal weightKg;
    private BigDecimal targetWeightKg;
    private String activityLevel;
    private String fitnessGoal;
    private String dietaryPreference;
}
