package com.fitness.ai.dto;

import lombok.Data;

@Data
public class NutritionSummaryDto {
    private Long userId;
    private Double totalCalories;
    private Double totalProtein;
    private Double totalCarbohydrates;
    private Double totalFat;
}
