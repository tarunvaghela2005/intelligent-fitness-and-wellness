package com.fitness.nutrition.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "water_intakes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaterIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Integer amount; // in ml

    private LocalDate date;
}
