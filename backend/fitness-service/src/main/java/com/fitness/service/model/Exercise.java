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
    public Object getDescription() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDescription'");
    }
    public void setDescription(Object description) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDescription'");
    }
    public Object getCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCategory'");
    }
    public void setCategory(Object category) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCategory'");
    }
    public Object getCaloriesBurned() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCaloriesBurned'");
    }
    public void setCaloriesBurned(Object caloriesBurned) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCaloriesBurned'");
    }
    public Object getImageUrl() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getImageUrl'");
    }
    public void setImageUrl(Object imageUrl) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setImageUrl'");
    }
}
