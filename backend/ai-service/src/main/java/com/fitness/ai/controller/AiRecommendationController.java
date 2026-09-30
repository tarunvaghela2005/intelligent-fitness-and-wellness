package com.fitness.ai.controller;

import com.fitness.ai.service.RecommendationEngineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping({"/api/ai", "/api/v1/ai"})
@RequiredArgsConstructor
public class AiRecommendationController {

    private final RecommendationEngineService recommendationEngineService;

    @GetMapping("/recommendation/{userId}")
    public ResponseEntity<Map<String, Object>> getRecommendations(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationEngineService.generateRecommendations(userId));
    }

    @GetMapping("/bmi/{userId}")
    public ResponseEntity<Map<String, Object>> getBmi(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationEngineService.calculateBmi(userId));
    }

    @GetMapping("/calories/{userId}")
    public ResponseEntity<Map<String, Object>> getCalories(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationEngineService.calculateCalories(userId));
    }
}
