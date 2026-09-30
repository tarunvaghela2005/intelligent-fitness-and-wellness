package com.fitness.nutrition.controller;

import com.fitness.nutrition.model.Meal;
import com.fitness.nutrition.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/nutrition/meals", "/api/meals"})
@RequiredArgsConstructor
public class MealController {

    private final MealRepository mealRepository;

    @PostMapping
    public ResponseEntity<Meal> addMeal(@RequestBody Meal meal) {
        if (meal.getDate() == null) {
            meal.setDate(LocalDate.now());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(mealRepository.save(meal));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Meal>> getMealsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(mealRepository.findByUserIdOrderByDateDesc(userId));
    }

    @GetMapping("/user/{userId}/daily")
    public ResponseEntity<Map<String, Object>> getDailySummary(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        List<Meal> meals = mealRepository.findByUserIdAndDate(userId, targetDate);

        double totalCalories = meals.stream().mapToDouble(m -> m.getTotalCalories() != null ? m.getTotalCalories() : 0.0).sum();
        double totalProtein = meals.stream().mapToDouble(m -> m.getProtein() != null ? m.getProtein() : 0.0).sum();
        double totalCarbs = meals.stream().mapToDouble(m -> m.getCarbohydrates() != null ? m.getCarbohydrates() : 0.0).sum();
        double totalFat = meals.stream().mapToDouble(m -> m.getFat() != null ? m.getFat() : 0.0).sum();

        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("date", targetDate);
        response.put("meals", meals);
        response.put("totalCalories", Math.round(totalCalories * 10.0) / 10.0);
        response.put("totalProtein", Math.round(totalProtein * 10.0) / 10.0);
        response.put("totalCarbohydrates", Math.round(totalCarbs * 10.0) / 10.0);
        response.put("totalFat", Math.round(totalFat * 10.0) / 10.0);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        if (mealRepository.existsById(id)) {
            mealRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
