package com.fitness.service.controller;

import com.fitness.service.model.Food;
import com.fitness.service.model.MealLog;
import com.fitness.service.repository.FoodRepository;
import com.fitness.service.repository.MealLogRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class NutritionController {

    private final FoodRepository foodRepository;
    private final MealLogRepository mealLogRepository;

    @GetMapping("/api/foods")
    public ResponseEntity<List<Food>> getAllFoods() {
        return ResponseEntity.ok(foodRepository.findAll());
    }

    @PostMapping("/api/meals")
    public ResponseEntity<MealLog> logMeal(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @RequestBody MealLog logRequest) {

        logRequest.setUserId(userId);
        if (logRequest.getDate() == null) {
            logRequest.setDate(LocalDate.now());
        }

        if (logRequest.getFoodId() != null) {
            foodRepository.findById(logRequest.getFoodId()).ifPresent(food -> {
                double qty = logRequest.getQuantity() != null ? logRequest.getQuantity() : 1.0;
                logRequest.setFoodName(food.getFoodName());
                logRequest.setCalories(Math.round(food.getCalories() * qty * 10.0) / 10.0);
                logRequest.setProtein(Math.round(food.getProtein() * qty * 10.0) / 10.0);
                logRequest.setCarbohydrates(Math.round(food.getCarbohydrates() * qty * 10.0) / 10.0);
                logRequest.setFats(Math.round(food.getFats() * qty * 10.0) / 10.0);
            });
        }

        return ResponseEntity.ok(mealLogRepository.save(logRequest));
    }

    @GetMapping("/api/meals/today")
    public ResponseEntity<List<MealLog>> getTodayMeals(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {
        return ResponseEntity.ok(mealLogRepository.findByUserIdAndDate(userId, LocalDate.now()));
    }

    @GetMapping("/api/nutrition/summary")
    public ResponseEntity<NutritionSummaryDto> getNutritionSummary(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {

        List<MealLog> todayMeals = mealLogRepository.findByUserIdAndDate(userId, LocalDate.now());

        double totalCalories = todayMeals.stream().mapToDouble(m -> m.getCalories() != null ? m.getCalories() : 0.0).sum();
        double totalProtein = todayMeals.stream().mapToDouble(m -> m.getProtein() != null ? m.getProtein() : 0.0).sum();
        double totalCarbs = todayMeals.stream().mapToDouble(m -> m.getCarbohydrates() != null ? m.getCarbohydrates() : 0.0).sum();
        double totalFats = todayMeals.stream().mapToDouble(m -> m.getFats() != null ? m.getFats() : 0.0).sum();

        NutritionSummaryDto summary = new NutritionSummaryDto();
        summary.setUserId(userId);
        summary.setDate(LocalDate.now());
        summary.setTotalCalories(totalCalories);
        summary.setTotalProtein(totalProtein);
        summary.setTotalCarbs(totalCarbs);
        summary.setTotalFats(totalFats);
        summary.setMealCount(todayMeals.size());

        return ResponseEntity.ok(summary);
    }

    @Data
    public static class NutritionSummaryDto {
        private Long userId;
        private LocalDate date;
        private Double totalCalories;
        private Double totalProtein;
        private Double totalCarbs;
        private Double totalFats;
        private Integer mealCount;
    }
}
