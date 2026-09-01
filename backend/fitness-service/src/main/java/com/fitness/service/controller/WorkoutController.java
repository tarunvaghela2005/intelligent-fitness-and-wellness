package com.fitness.service.controller;

import com.fitness.service.model.Exercise;
import com.fitness.service.model.WorkoutExercise;
import com.fitness.service.model.WorkoutSession;
import com.fitness.service.repository.ExerciseRepository;
import com.fitness.service.repository.WorkoutSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class WorkoutController {

    private final ExerciseRepository exerciseRepository;
    private final WorkoutSessionRepository workoutSessionRepository;

    @GetMapping("/api/exercises")
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(exerciseRepository.findAll());
    }

    @GetMapping("/api/workouts")
    public ResponseEntity<List<WorkoutSession>> getUserWorkouts(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {
        return ResponseEntity.ok(workoutSessionRepository.findByUserIdOrderByDateDesc(userId));
    }

    @PostMapping("/api/workouts")
    public ResponseEntity<WorkoutSession> createWorkoutSession(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @RequestBody(required = false) WorkoutSession session) {
        if (session == null) {
            session = new WorkoutSession();
        }
        session.setUserId(userId);
        if (session.getDate() == null) {
            session.setDate(LocalDate.now());
        }
        if (session.getCompleted() == null) {
            session.setCompleted(false);
        }
        return ResponseEntity.ok(workoutSessionRepository.save(session));
    }

    @PostMapping("/api/workouts/{id}/exercise")
    public ResponseEntity<WorkoutSession> addExerciseToWorkout(
            @PathVariable Long id,
            @RequestBody WorkoutExercise exercise) {
        WorkoutSession session = workoutSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout session not found"));

        session.getExercises().add(exercise);
        return ResponseEntity.ok(workoutSessionRepository.save(session));
    }

    @PutMapping("/api/workouts/{id}/complete")
    public ResponseEntity<WorkoutSession> completeWorkout(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "45") Integer duration,
            @RequestParam(required = false, defaultValue = "320") Double caloriesBurned) {
        WorkoutSession session = workoutSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout session not found"));

        session.setCompleted(true);
        session.setDurationMinutes(duration);
        session.setCaloriesBurned(caloriesBurned);

        return ResponseEntity.ok(workoutSessionRepository.save(session));
    }
}
