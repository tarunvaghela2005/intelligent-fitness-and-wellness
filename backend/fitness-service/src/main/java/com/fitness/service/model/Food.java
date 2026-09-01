package com.fitness.service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "foods")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String foodName;

    private String servingSize;
    private Double calories;
    private Double protein;
    private Double carbohydrates;
    private Double fats;

    public Food() {}

    public Food(Long id, String foodName, String servingSize, Double calories, Double protein, Double carbohydrates, Double fats) {
        this.id = id;
        this.foodName = foodName;
        this.servingSize = servingSize;
        this.calories = calories;
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.fats = fats;
    }

    public static FoodBuilder builder() {
        return new FoodBuilder();
    }

    public static class FoodBuilder {
        private Long id;
        private String foodName;
        private String servingSize;
        private Double calories;
        private Double protein;
        private Double carbohydrates;
        private Double fats;

        public FoodBuilder id(Long id) { this.id = id; return this; }
        public FoodBuilder foodName(String foodName) { this.foodName = foodName; return this; }
        public FoodBuilder servingSize(String servingSize) { this.servingSize = servingSize; return this; }
        public FoodBuilder calories(Double calories) { this.calories = calories; return this; }
        public FoodBuilder protein(Double protein) { this.protein = protein; return this; }
        public FoodBuilder carbohydrates(Double carbohydrates) { this.carbohydrates = carbohydrates; return this; }
        public FoodBuilder fats(Double fats) { this.fats = fats; return this; }

        public Food build() {
            return new Food(id, foodName, servingSize, calories, protein, carbohydrates, fats);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }

    public String getServingSize() { return servingSize; }
    public void setServingSize(String servingSize) { this.servingSize = servingSize; }

    public Double getCalories() { return calories; }
    public void setCalories(Double calories) { this.calories = calories; }

    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }

    public Double getCarbohydrates() { return carbohydrates; }
    public void setCarbohydrates(Double carbohydrates) { this.carbohydrates = carbohydrates; }

    public Double getFats() { return fats; }
    public void setFats(Double fats) { this.fats = fats; }
}
