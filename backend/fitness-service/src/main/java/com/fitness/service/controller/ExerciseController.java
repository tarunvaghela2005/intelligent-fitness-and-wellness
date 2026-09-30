package com.fitness.service.controller;

import com.fitness.service.model.Exercise;
import com.fitness.service.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/fitness/exercises", "/api/exercises"})
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseRepository exerciseRepository;

    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(exerciseRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        return exerciseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.status(HttpStatus.CREATED).body(exerciseRepository.save(exercise));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise updated) {
        return exerciseRepository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setDescription(updated.getDescription());
                    existing.setCategory(updated.getCategory());
                    existing.setDifficulty(updated.getDifficulty());
                    existing.setDescription(updated.getDescription());
                    existing.setCaloriesBurned(updated.getCaloriesBurned());
                    existing.setEquipment(updated.getEquipment());
                    existing.setImageUrl(updated.getImageUrl());
                    return ResponseEntity.ok(exerciseRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        if (exerciseRepository.existsById(id)) {
            exerciseRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
