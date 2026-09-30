package com.fitness.ai.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class WorkoutDto {
    private Long id;
    private Long userId;
    private Long exerciseId;
    private String exerciseName;
    private LocalDate date;
    private Integer duration;
    private Integer sets;
    private Integer repetitions;
    private Integer caloriesBurned;
}
