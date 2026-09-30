package com.fitness.service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "fitness_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Double weight; // in kg

    private Double bodyFat; // percentage

    private Integer workoutCount;

    private Integer caloriesBurned;

    private LocalDate recordedDate;
}
