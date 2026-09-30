package com.fitness.ai;

import com.fitness.ai.client.FitnessClient;
import com.fitness.ai.client.NutritionClient;
import com.fitness.ai.client.UserClient;
import com.fitness.ai.service.RecommendationEngineService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecommendationEngineServiceTest {

    @Mock
    private UserClient userClient;

    @Mock
    private FitnessClient fitnessClient;

    @Mock
    private NutritionClient nutritionClient;

    private RecommendationEngineService recommendationEngineService;

    @BeforeEach
    void setUp() {
        recommendationEngineService = new RecommendationEngineService(userClient, fitnessClient, nutritionClient);
    }

    @Test
    void testCalculateBmiNormal() {
        when(userClient.getUserById(anyLong())).thenReturn(Map.of(
                "data", Map.of(
                        "weightKg", 70.0,
                        "heightCm", 175.0
                )
        ));

        Map<String, Object> bmi = recommendationEngineService.calculateBmi(1L);
        assertNotNull(bmi);
        assertEquals("Normal", bmi.get("category"));
        assertEquals(22.9, (double) bmi.get("bmi"));
    }

    @Test
    void testCalculateCaloriesBmrAndTdee() {
        when(userClient.getUserById(anyLong())).thenReturn(Map.of(
                "data", Map.of(
                        "weightKg", 70.0,
                        "heightCm", 175.0,
                        "age", 25,
                        "gender", "male",
                        "activityLevel", "moderate",
                        "fitnessGoal", "maintain"
                )
        ));

        Map<String, Object> cal = recommendationEngineService.calculateCalories(1L);
        assertNotNull(cal);
        assertTrue((long) cal.get("bmr") > 1500);
        assertTrue((long) cal.get("tdee") > (long) cal.get("bmr"));
    }

    @Test
    void testGenerateRecommendations() {
        when(userClient.getUserById(anyLong())).thenReturn(Map.of(
                "data", Map.of(
                        "weightKg", 85.0,
                        "heightCm", 170.0,
                        "age", 30,
                        "gender", "male",
                        "activityLevel", "sedentary",
                        "fitnessGoal", "weight_loss"
                )
        ));
        when(fitnessClient.getWorkoutsByUser(anyLong())).thenReturn(Collections.emptyList());
        when(nutritionClient.getDailyNutrition(anyLong())).thenReturn(Collections.emptyMap());

        Map<String, Object> recs = recommendationEngineService.generateRecommendations(1L);
        assertNotNull(recs);
        assertTrue(recs.containsKey("recommendations"));
        assertTrue(recs.containsKey("disclaimer"));
    }
}
