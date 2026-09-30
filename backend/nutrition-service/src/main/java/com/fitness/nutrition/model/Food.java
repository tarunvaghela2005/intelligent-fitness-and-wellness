package com.fitness.nutrition.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category; // Grain, Protein, Dairy, Fruit, Vegetable, Snack

    private Double calories;

    private Double protein;

    private Double carbohydrates;

    private Double fat;

    private String servingSize;
}
