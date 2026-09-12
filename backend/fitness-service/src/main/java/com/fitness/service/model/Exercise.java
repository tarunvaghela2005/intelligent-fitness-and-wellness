package com.fitness.service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String targetMuscle; // Chest, Back, Legs, Shoulders, Arms, Core, Cardio
    private String difficulty; // Beginner, Intermediate, Advanced
    private String equipment; // Barbell, Dumbbell, Machine, Bodyweight
    @Column(length = 1000)
    private String instructions;
}
