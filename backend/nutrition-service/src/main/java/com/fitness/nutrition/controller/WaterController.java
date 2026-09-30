package com.fitness.nutrition.controller;

import com.fitness.nutrition.model.WaterIntake;
import com.fitness.nutrition.repository.WaterIntakeRepository;
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
@RequestMapping({"/api/nutrition/water", "/api/water"})
@RequiredArgsConstructor
public class WaterController {

    private final WaterIntakeRepository waterIntakeRepository;

    @PostMapping
    public ResponseEntity<WaterIntake> addWater(@RequestBody WaterIntake waterIntake) {
        if (waterIntake.getDate() == null) {
            waterIntake.setDate(LocalDate.now());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(waterIntakeRepository.save(waterIntake));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WaterIntake>> getWaterByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(waterIntakeRepository.findByUserIdOrderByDateDesc(userId));
    }

    @GetMapping("/user/{userId}/today")
    public ResponseEntity<Map<String, Object>> getTodayWater(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        List<WaterIntake> logs = waterIntakeRepository.findByUserIdAndDate(userId, targetDate);
        int totalAmount = logs.stream().mapToInt(w -> w.getAmount() != null ? w.getAmount() : 0).sum();

        Map<String, Object> res = new HashMap<>();
        res.put("userId", userId);
        res.put("date", targetDate);
        res.put("totalAmountMl", totalAmount);
        res.put("targetAmountMl", 2500); // recommended 2.5L daily target
        res.put("logs", logs);

        return ResponseEntity.ok(res);
    }
}
