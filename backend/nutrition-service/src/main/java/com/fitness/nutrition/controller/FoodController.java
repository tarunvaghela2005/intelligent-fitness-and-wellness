package com.fitness.nutrition.controller;

import com.fitness.nutrition.model.Food;
import com.fitness.nutrition.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/nutrition/foods", "/api/foods"})
@RequiredArgsConstructor
public class FoodController {

    private final FoodRepository foodRepository;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        return ResponseEntity.ok(foodRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        return foodRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        return ResponseEntity.status(HttpStatus.CREATED).body(foodRepository.save(food));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food updated) {
        return foodRepository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setCategory(updated.getCategory());
                    existing.setCalories(updated.getCalories());
                    existing.setProtein(updated.getProtein());
                    existing.setCarbohydrates(updated.getCarbohydrates());
                    existing.setFat(updated.getFat());
                    existing.setServingSize(updated.getServingSize());
                    return ResponseEntity.ok(foodRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
