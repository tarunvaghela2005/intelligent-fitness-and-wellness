package com.fitness.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private Long id;
    private String name;
    private String email;
    private Integer age;
    private String gender;
    private Double height;
    private Double weight;
    private String activityLevel;
    private String fitnessGoal;
}
