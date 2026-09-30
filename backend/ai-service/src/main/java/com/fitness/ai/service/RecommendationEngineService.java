package com.fitness.ai.service;

import com.fitness.ai.client.FitnessClient;
import com.fitness.ai.client.NutritionClient;
import com.fitness.ai.client.UserClient;
import com.fitness.ai.dto.WorkoutDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationEngineService {

    private final UserClient userClient;
    private final FitnessClient fitnessClient;
    private final NutritionClient nutritionClient;

    public Map<String, Object> calculateBmi(Long userId) {
        Map<String, Object> userData = fetchUserData(userId);
        double weight = getDoubleVal(userData, "weightKg", 70.0);
        double heightCm = getDoubleVal(userData, "heightCm", 175.0);

        double heightM = heightCm / 100.0;
        double bmi = (heightM > 0) ? (weight / (heightM * heightM)) : 22.0;
        double roundedBmi = Math.round(bmi * 10.0) / 10.0;

        String category;
        String color;
        if (roundedBmi < 18.5) {
            category = "Underweight";
            color = "#3b82f6";
        } else if (roundedBmi < 25.0) {
            category = "Normal";
            color = "#10b981";
        } else if (roundedBmi < 30.0) {
            category = "Overweight";
            color = "#f59e0b";
        } else {
            category = "Obese";
            color = "#ef4444";
        }

        Map<String, Object> res = new HashMap<>();
        res.put("userId", userId);
        res.put("heightCm", heightCm);
        res.put("weightKg", weight);
        res.put("bmi", roundedBmi);
        res.put("category", category);
        res.put("statusColor", color);
        res.put("disclaimer", "This is a rule-based fitness assessment, not a medical diagnosis.");
        return res;
    }

    public Map<String, Object> calculateCalories(Long userId) {
        Map<String, Object> userData = fetchUserData(userId);
        double weight = getDoubleVal(userData, "weightKg", 70.0);
        double heightCm = getDoubleVal(userData, "heightCm", 175.0);
        int age = getIntVal(userData, "age", 25);
        String gender = getStringVal(userData, "gender", "male");
        String activityLevel = getStringVal(userData, "activityLevel", "moderate");
        String fitnessGoal = getStringVal(userData, "fitnessGoal", "maintain");

        // Mifflin-St Jeor formula
        double bmr;
        if ("female".equalsIgnoreCase(gender)) {
            bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
        } else {
            bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
        }

        double multiplier = switch (activityLevel.toLowerCase()) {
            case "sedentary" -> 1.2;
            case "light" -> 1.375;
            case "active", "very active" -> 1.725;
            default -> 1.55; // moderate
        };

        double tdee = bmr * multiplier;

        double targetCalories;
        if (fitnessGoal.toLowerCase().contains("loss") || fitnessGoal.toLowerCase().contains("lose")) {
            targetCalories = tdee - 500; // 500 kcal deficit
        } else if (fitnessGoal.toLowerCase().contains("gain") || fitnessGoal.toLowerCase().contains("muscle") || fitnessGoal.toLowerCase().contains("bulk")) {
            targetCalories = tdee + 350; // 350 kcal surplus
        } else {
            targetCalories = tdee;
        }

        Map<String, Object> res = new HashMap<>();
        res.put("userId", userId);
        res.put("bmr", Math.round(bmr));
        res.put("tdee", Math.round(tdee));
        res.put("targetDailyCalories", Math.max(1200, Math.round(targetCalories)));
        res.put("recommendedProteinGrams", Math.round(weight * 1.8));
        res.put("recommendedCarbsGrams", Math.round((targetCalories * 0.45) / 4.0));
        res.put("recommendedFatGrams", Math.round((targetCalories * 0.25) / 9.0));
        res.put("disclaimer", "Calculations are rule-based estimates using standard Mifflin-St Jeor and TDEE formulas.");
        return res;
    }

    public Map<String, Object> generateRecommendations(Long userId) {
        Map<String, Object> bmiData = calculateBmi(userId);
        Map<String, Object> calorieData = calculateCalories(userId);
        double bmi = (double) bmiData.get("bmi");
        String category = (String) bmiData.get("category");

        List<WorkoutDto> workouts = Collections.emptyList();
        try {
            workouts = fitnessClient.getWorkoutsByUser(userId);
        } catch (Exception e) {
            log.warn("Could not fetch workouts for user {}: {}", userId, e.getMessage());
        }

        Map<String, Object> nutrition = Collections.emptyMap();
        try {
            nutrition = nutritionClient.getDailyNutrition(userId);
        } catch (Exception e) {
            log.warn("Could not fetch nutrition for user {}: {}", userId, e.getMessage());
        }

        List<Map<String, String>> recommendations = new ArrayList<>();

        // 1. BMI & Weight based recommendation
        if ("Overweight".equals(category) || "Obese".equals(category)) {
            recommendations.add(Map.of(
                    "type", "WORKOUT",
                    "title", "Focus on Cardiovascular & High-Rep Circuit Training",
                    "description", "Aim for 3-4 sessions per week combining 25 minutes of moderate cardio (Running/Cycling) with full-body bodyweight circuits (Squats, Push-ups) to elevate caloric expenditure safely."
            ));
            recommendations.add(Map.of(
                    "type", "NUTRITION",
                    "title", "Caloric Deficit & High Fiber Focus",
                    "description", "Maintain a controlled deficit of 300-500 kcal from your TDEE (" + calorieData.get("tdee") + " kcal). Prioritize vegetables, whole dal, oats, and lean chicken to promote satiety."
            ));
        } else if ("Underweight".equals(category)) {
            recommendations.add(Map.of(
                    "type", "NUTRITION",
                    "title", "Caloric Surplus & Protein Density",
                    "description", "Target a healthy caloric surplus (+300 to +500 kcal). Add nutrient-dense foods like whole milk, paneer, eggs, peanut butter, and bananas to your daily meals."
            ));
            recommendations.add(Map.of(
                    "type", "WORKOUT",
                    "title", "Progressive Strength Training",
                    "description", "Prioritize compound lifts (Barbell Squats, Bench Press) for 3-4 sets of 8-10 repetitions. Limit excessive endurance cardio to conserve calories for muscle hypertrophy."
            ));
        } else {
            recommendations.add(Map.of(
                    "type", "GENERAL",
                    "title", "Maintain Peak Conditioning & Balance",
                    "description", "Your BMI is in the optimal range. Balance 3 strength sessions with 2 cardio or yoga sessions weekly to sustain lean muscle mass and cardiovascular health."
            ));
        }

        // 2. Workout History Frequency Check
        if (workouts == null || workouts.size() < 3) {
            recommendations.add(Map.of(
                    "type", "ROUTINE",
                    "title", "Build Workout Consistency",
                    "description", "You currently have fewer than 3 logged workouts. Start with manageable 20-30 minute workouts every alternate day to build a sustainable exercise habit."
            ));
        } else {
            recommendations.add(Map.of(
                    "type", "ACHIEVEMENT",
                    "title", "Great Workout Momentum!",
                    "description", "You have logged " + workouts.size() + " workouts. Continue progressively overloading by slightly increasing weights or repetitions each week."
            ));
        }

        // 3. Nutrition & Hydration Check
        Double loggedCalories = (nutrition != null && nutrition.get("totalCalories") != null)
                ? Double.parseDouble(nutrition.get("totalCalories").toString()) : 0.0;
        long targetCal = (long) calorieData.get("targetDailyCalories");

        if (loggedCalories > targetCal + 300) {
            recommendations.add(Map.of(
                    "type", "NUTRITION_ADJUSTMENT",
                    "title", "Calorie Surplus Alert",
                    "description", "Your logged intake (" + Math.round(loggedCalories) + " kcal) exceeds your target (" + targetCal + " kcal). Consider scaling back carb portions during late-night meals."
            ));
        }

        recommendations.add(Map.of(
                "type", "HYDRATION",
                "title", "Hydration Target",
                "description", "Ensure you drink at least 2.5 to 3 liters of water daily, particularly 500ml 30 minutes before workout sessions."
        ));

        Map<String, Object> result = new HashMap<>();
        result.put("userId", userId);
        result.put("bmiAnalysis", bmiData);
        result.put("calorieAnalysis", calorieData);
        result.put("recommendations", recommendations);
        result.put("systemType", "Rule-Based Intelligent Recommendation Engine");
        result.put("disclaimer", "NOTICE: This system provides algorithmic guidance based on standard exercise science formulas and user telemetry. It is not intended as medical advice.");

        return result;
    }

    private Map<String, Object> fetchUserData(Long userId) {
        try {
            Map<String, Object> response = userClient.getUserById(userId);
            if (response != null && response.containsKey("data")) {
                Object dataObj = response.get("data");
                if (dataObj instanceof Map) {
                    return (Map<String, Object>) dataObj;
                }
            }
            return response != null ? response : Collections.emptyMap();
        } catch (Exception e) {
            log.warn("Unable to fetch user data from user-service for id {}: {}", userId, e.getMessage());
            return Collections.emptyMap();
        }
    }

    private double getDoubleVal(Map<String, Object> map, String key, double fallback) {
        Object val = map.get(key);
        if (val == null) return fallback;
        try {
            return Double.parseDouble(val.toString());
        } catch (Exception e) {
            return fallback;
        }
    }

    private int getIntVal(Map<String, Object> map, String key, int fallback) {
        Object val = map.get(key);
        if (val == null) return fallback;
        try {
            return Integer.parseInt(val.toString());
        } catch (Exception e) {
            return fallback;
        }
    }

    private String getStringVal(Map<String, Object> map, String key, String fallback) {
        Object val = map.get(key);
        return val != null ? val.toString() : fallback;
    }
}
