package com.fitness.nutrition.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "meals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String mealType; // Breakfast, Lunch, Dinner, Snack

    private Long foodId;

    private String foodName;

    private Double quantity; // e.g. 1.0, 2.0 servings

    private LocalDate date;

    private Double totalCalories;

    private Double protein;

    private Double carbohydrates;

    private Double fat;
}
