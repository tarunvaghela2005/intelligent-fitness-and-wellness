package com.fitness.user.service;

import com.fitness.user.dto.HealthMetricsDto;
import com.fitness.user.model.HealthMetrics;
import com.fitness.user.model.User;
import com.fitness.user.repository.HealthMetricsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HealthDiagnosticsService {

    private final HealthMetricsRepository healthMetricsRepository;

    public HealthMetrics calculateAndSaveMetrics(User user) {
        double weight = user.getWeight() != null ? user.getWeight() : 70.0;
        double height = user.getHeight() != null ? user.getHeight() : 170.0;
        int age = user.getAge() != null ? user.getAge() : 25;
        String gender = user.getGender() != null ? user.getGender().toUpperCase() : "MALE";
        String activity = user.getActivityLevel() != null ? user.getActivityLevel().toUpperCase() : "MODERATELY_ACTIVE";
        String goal = user.getFitnessGoal() != null ? user.getFitnessGoal().toUpperCase() : "MAINTENANCE";

        // 1. BMI calculation: weight (kg) / (height (m))^2
        double heightInMeters = height / 100.0;
        double bmi = Math.round((weight / (heightInMeters * heightInMeters)) * 10.0) / 10.0;

        // 2. BMR calculation (Mifflin-St Jeor Equation)
        double bmrBase = (10 * weight) + (6.25 * height) - (5 * age);
        double bmr = "FEMALE".equalsIgnoreCase(gender) ? bmrBase - 161 : bmrBase + 5;
        bmr = Math.round(bmr);

        // 3. TDEE calculation
        double activityMultiplier = switch (activity) {
            case "SEDENTARY" -> 1.2;
            case "LIGHTLY_ACTIVE" -> 1.375;
            case "MODERATELY_ACTIVE" -> 1.55;
            case "VERY_ACTIVE" -> 1.725;
            case "EXTRA_ACTIVE" -> 1.9;
            default -> 1.55;
        };
        double tdee = Math.round(bmr * activityMultiplier);

        // 4. Calorie Target
        double calorieTarget = switch (goal) {
            case "WEIGHT_LOSS" -> Math.max(1200, tdee - 500);
            case "MUSCLE_GAIN" -> tdee + 350;
            default -> tdee;
        };
        calorieTarget = Math.round(calorieTarget);

        // 5. Macro Targets
        double proteinTarget = Math.round(weight * 2.0); // 2.0g per kg
        double fatTarget = Math.round((calorieTarget * 0.25) / 9.0); // 25% of calories
        double remainingCalories = calorieTarget - ((proteinTarget * 4) + (fatTarget * 9));
        double carbTarget = Math.round(Math.max(50, remainingCalories / 4.0));

        HealthMetrics metrics = healthMetricsRepository.findByUserId(user.getId())
                .orElseGet(() -> HealthMetrics.builder().userId(user.getId()).build());

        metrics.setBmi(bmi);
        metrics.setBmr(bmr);
        metrics.setTdee(tdee);
        metrics.setCalorieTarget(calorieTarget);
        metrics.setProteinTarget(proteinTarget);
        metrics.setCarbTarget(carbTarget);
        metrics.setFatTarget(fatTarget);

        return healthMetricsRepository.save(metrics);
    }

    public HealthMetricsDto convertToDto(HealthMetrics metrics) {
        return HealthMetricsDto.builder()
                .userId(metrics.getUserId())
                .bmi(metrics.getBmi())
                .bmr(metrics.getBmr())
                .tdee(metrics.getTdee())
                .calorieTarget(metrics.getCalorieTarget())
                .proteinTarget(metrics.getProteinTarget())
                .carbTarget(metrics.getCarbTarget())
                .fatTarget(metrics.getFatTarget())
                .build();
    }
}
