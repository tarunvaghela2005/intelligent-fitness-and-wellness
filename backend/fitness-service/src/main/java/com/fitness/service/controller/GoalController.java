package com.fitness.service.controller;

import com.fitness.service.model.FitnessGoal;
import com.fitness.service.repository.FitnessGoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/fitness/goals", "/api/goals"})
@RequiredArgsConstructor
public class GoalController {

    private final FitnessGoalRepository fitnessGoalRepository;

    @PostMapping
    public ResponseEntity<FitnessGoal> createGoal(@RequestBody FitnessGoal goal) {
        if (goal.getStatus() == null) {
            goal.setStatus("IN_PROGRESS");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(fitnessGoalRepository.save(goal));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FitnessGoal>> getGoalsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(fitnessGoalRepository.findByUserId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FitnessGoal> updateGoal(@PathVariable Long id, @RequestBody FitnessGoal updated) {
        return fitnessGoalRepository.findById(id)
                .map(existing -> {
                    existing.setGoalType(updated.getGoalType());
                    existing.setTargetWeight(updated.getTargetWeight());
                    existing.setTargetCalories(updated.getTargetCalories());
                    existing.setTargetDate(updated.getTargetDate());
                    existing.setStatus(updated.getStatus());
                    return ResponseEntity.ok(fitnessGoalRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
