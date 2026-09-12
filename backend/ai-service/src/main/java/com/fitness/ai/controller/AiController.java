package com.fitness.ai.controller;

import com.fitness.ai.service.GeminiAiService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final GeminiAiService geminiAiService;

    @PostMapping("/workout")
    public ResponseEntity<Map<String, String>> getWorkoutRecommendation(@RequestBody(required = false) AiRequest request) {
        String goal = request != null && request.getGoal() != null ? request.getGoal() : "Muscle Gain & Strength";
        String level = request != null && request.getExperienceLevel() != null ? request.getExperienceLevel() : "Intermediate";

        String prompt = "Act as an expert AI Strength Coach. Generate a 4-day workout split for a person with goal '" + goal + "' and experience '" + level + "'. Include exercise names, sets, reps, and warm-up recommendations.";

        String fallback = """
                💪 AI Workout Recommendation Plan:
                • Goal: %s | Experience: %s
                
                🏋️ Day 1: Upper Body Strength
                - Barbell Bench Press: 4 sets x 8 reps (Rest: 90s)
                - Lat Pulldown: 4 sets x 10 reps
                - Overhead Shoulder Press: 3 sets x 10 reps
                - Dumbbell Bicep Curls: 3 sets x 12 reps
                
                🍗 Day 2: Lower Body & Core
                - Barbell Back Squats: 4 sets x 8 reps
                - Leg Press: 3 sets x 12 reps
                - Romanian Deadlifts: 3 sets x 10 reps
                - Plank Hold: 3 sets x 60 seconds
                
                🔥 Warm-up Tip: Perform 5-10 minutes of light dynamic cardio and arm swings before heavy compound lifts!
                """.formatted(goal, level);

        String result = geminiAiService.generateRecommendation(prompt, fallback);
        return ResponseEntity.ok(Map.of("recommendation", result));
    }

    @PostMapping("/meal")
    public ResponseEntity<Map<String, String>> getMealRecommendation(@RequestBody(required = false) AiRequest request) {
        Double targetCalories = request != null && request.getTargetCalories() != null ? request.getTargetCalories() : 2200.0;
        String dietType = request != null && request.getDietaryPreference() != null ? request.getDietaryPreference() : "High Protein";

        String prompt = "Act as an expert Nutritionist. Create a daily meal plan totaling " + targetCalories + " kcal with diet preference '" + dietType + "'. Break down into Breakfast, Lunch, Dinner, and Snacks with macro estimates.";

        String fallback = """
                🥗 AI Personalized Nutrition Plan:
                • Daily Calorie Target: %.0f kcal | Preference: %s
                
                🍳 Breakfast (approx 550 kcal, 40g Protein):
                - 3 Whole Eggs + 2 Egg Whites Scramble with Spinach
                - 1 Cup Cooked Oatmeal with 1/2 Banana and Cinnamon
                
                🍗 Lunch (approx 650 kcal, 45g Protein):
                - 150g Grilled Chicken Breast
                - 1 Cup Cooked White Rice
                - 1 Cup Steamed Broccoli with Olive Oil drizzle
                
                🥜 Snack (approx 300 kcal, 20g Protein):
                - 1 Scoop Whey Protein Shake + 30g Almonds
                
                🥩 Dinner (approx 700 kcal, 50g Protein):
                - 150g Baked Salmon Fillet
                - 150g Baked Sweet Potato
                - Mixed Green Salad with Lemon Dressing
                """.formatted(targetCalories, dietType);

        String result = geminiAiService.generateRecommendation(prompt, fallback);
        return ResponseEntity.ok(Map.of("recommendation", result));
    }

    @PostMapping("/progress")
    public ResponseEntity<Map<String, String>> getProgressAnalysis(@RequestBody(required = false) AiRequest request) {
        Double startWeight = request != null && request.getStartWeight() != null ? request.getStartWeight() : 75.0;
        Double currentWeight = request != null && request.getCurrentWeight() != null ? request.getCurrentWeight() : 72.5;

        String prompt = "Analyze fitness progress: Started at " + startWeight + " kg, currently at " + currentWeight + " kg. Provide encouragement, rate of progress assessment, and actionable next steps for plateau prevention.";

        double weightDiff = startWeight - currentWeight;
        String fallback = """
                📊 AI Progress Analysis Report:
                • Total Weight Difference: %.1f kg (From %.1f kg to %.1f kg)
                
                ✨ Progress Evaluation:
                You are moving at an optimal, healthy pace! Losing or gaining around 0.5 kg per week preserves lean muscle tissue while lowering fat storage.
                
                🎯 Recommended Next Steps:
                1. Re-calculate daily TDEE every 3-4 kg weight shift to adjust baseline calories.
                2. Maintain high protein intake (1.8-2.2g per kg bodyweight) to prevent muscle loss.
                3. Ensure 7-8 hours of quality sleep for optimal recovery and hormone regulation.
                """.formatted(weightDiff, startWeight, currentWeight);

        String result = geminiAiService.generateRecommendation(prompt, fallback);
        return ResponseEntity.ok(Map.of("recommendation", result));
    }

    @PostMapping("/wellness")
    public ResponseEntity<Map<String, String>> getWellnessGuidance(@RequestBody(required = false) AiRequest request) {
        String prompt = "Provide holistic health, sleep, hydration, and stress recovery tips for active individuals balancing fitness goals with work.";

        String fallback = """
                🌟 AI Holistic Wellness Coach Guidance:
                
                💧 Hydration:
                Aim for at least 3 to 3.5 Liters of water daily. Increase intake on heavy workout days by 500ml.
                
                😴 Sleep Optimization:
                Sleep is where muscle growth and neural recovery happen! Turn off screens 30 minutes before sleep and keep room temperature cool (18-20°C).
                
                🧘 Stress & Recovery:
                Chronic stress elevates Cortisol which can hinder weight loss and recovery. Practice 5 minutes of deep box breathing or light foam rolling after workouts.
                """;

        String result = geminiAiService.generateRecommendation(prompt, fallback);
        return ResponseEntity.ok(Map.of("recommendation", result));
    }

    @Data
    public static class AiRequest {
        private String goal;
        private String experienceLevel;
        private Double targetCalories;
        private String dietaryPreference;
        private Double startWeight;
        private Double currentWeight;
    }
}
