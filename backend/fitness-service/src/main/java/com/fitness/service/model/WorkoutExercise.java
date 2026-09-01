package com.fitness.service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workout_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long exerciseId;
    private String exerciseName;
    private Integer sets;
    private Integer repetitions;
    private Double weight; // in kg
}
