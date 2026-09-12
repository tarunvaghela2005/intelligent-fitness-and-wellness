package com.fitness.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthMetricsDto {
    private Long userId;
    private Double bmi;
    private Double bmr;
    private Double tdee;
    private Double calorieTarget;
    private Double proteinTarget;
    private Double carbTarget;
    private Double fatTarget;
}
