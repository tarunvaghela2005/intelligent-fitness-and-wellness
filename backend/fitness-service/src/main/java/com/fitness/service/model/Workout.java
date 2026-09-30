package com.fitness.service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Long exerciseId;

    private String exerciseName;

    private LocalDate date;

    private Integer duration; // in minutes

    private Integer sets;

    private Integer repetitions;

    private Integer caloriesBurned;

    @Column(length = 500)
    private String notes;
}
