package com.fitness.ai.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserDto {
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
