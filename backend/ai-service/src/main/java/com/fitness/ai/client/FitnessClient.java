package com.fitness.ai.client;

import com.fitness.ai.dto.WorkoutDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.cloud.openfeign.FeignClient;

import java.util.List;

@FeignClient(name = "fitness-service")
public interface FitnessClient {

    @GetMapping("/api/fitness/workouts/user/{userId}")
    List<WorkoutDto> getWorkoutsByUser(@PathVariable("userId") Long userId);
}
