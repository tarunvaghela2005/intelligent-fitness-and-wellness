package com.fitness.user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "health_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    private Double bmi;
    private Double bmr;
    private Double tdee;
    private Double calorieTarget;
    private Double proteinTarget;
    private Double carbTarget;
    private Double fatTarget;
}
