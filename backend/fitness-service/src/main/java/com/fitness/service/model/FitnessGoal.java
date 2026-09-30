package com.fitness.service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "fitness_goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FitnessGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String goalType; // Weight Loss, Muscle Gain, Maintenance, Endurance

    private Double targetWeight; // in kg

    private Integer targetCalories; // daily target calories

    private LocalDate targetDate;

    private String status; // IN_PROGRESS, COMPLETED, CANCELLED
}
