package com.fitness.ai.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.cloud.openfeign.FeignClient;
import java.util.Map;

@FeignClient(name = "nutrition-service")
public interface NutritionClient {

    @GetMapping("/api/nutrition/meals/user/{userId}/daily")
    Map<String, Object> getDailyNutrition(@PathVariable("userId") Long userId);
}
