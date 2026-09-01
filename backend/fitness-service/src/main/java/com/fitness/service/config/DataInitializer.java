package com.fitness.service.config;

import com.fitness.service.model.Exercise;
import com.fitness.service.model.Food;
import com.fitness.service.repository.ExerciseRepository;
import com.fitness.service.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;
    private final FoodRepository foodRepository;

    @Override
    public void run(String... args) {
        if (exerciseRepository.count() == 0) {
            exerciseRepository.saveAll(List.of(
                    Exercise.builder().name("Barbell Bench Press").targetMuscle("Chest").difficulty("Intermediate").equipment("Barbell").instructions("Lie flat on bench, lower barbell to mid-chest, press upwards explosively.").build(),
                    Exercise.builder().name("Incline Dumbbell Press").targetMuscle("Chest").difficulty("Intermediate").equipment("Dumbbell").instructions("Set bench to 30 degrees, press dumbbells vertically.").build(),
                    Exercise.builder().name("Push-ups").targetMuscle("Chest").difficulty("Beginner").equipment("Bodyweight").instructions("Keep core tight, lower chest near ground and push back up.").build(),
                    Exercise.builder().name("Barbell Back Squat").targetMuscle("Legs").difficulty("Intermediate").equipment("Barbell").instructions("Place bar on upper back, squat down until thighs parallel to ground.").build(),
                    Exercise.builder().name("Leg Press").targetMuscle("Legs").difficulty("Beginner").equipment("Machine").instructions("Place feet shoulder width apart on platform, push upward.").build(),
                    Exercise.builder().name("Conventional Deadlift").targetMuscle("Back").difficulty("Advanced").equipment("Barbell").instructions("Hinge at hips, maintain flat back, lift bar off floor to hip level.").build(),
                    Exercise.builder().name("Lat Pulldown").targetMuscle("Back").difficulty("Beginner").equipment("Machine").instructions("Pull bar down to upper chest, squeeze shoulder blades.").build(),
                    Exercise.builder().name("Overhead Shoulder Press").targetMuscle("Shoulders").difficulty("Intermediate").equipment("Barbell").instructions("Press bar overhead overhead vertically until arms locked out.").build(),
                    Exercise.builder().name("Dumbbell Bicep Curls").targetMuscle("Arms").difficulty("Beginner").equipment("Dumbbell").instructions("Keep elbows at sides, curl weights toward shoulders.").build(),
                    Exercise.builder().name("Tricep Rope Pushdown").targetMuscle("Arms").difficulty("Beginner").equipment("Cable").instructions("Push rope downward and split at the bottom to contract triceps.").build(),
                    Exercise.builder().name("Plank").targetMuscle("Core").difficulty("Beginner").equipment("Bodyweight").instructions("Hold forearms on ground, body in straight line for time.").build(),
                    Exercise.builder().name("Treadmill Running").targetMuscle("Cardio").difficulty("Beginner").equipment("Treadmill").instructions("Run at moderate speed (8-10 km/h) for cardiovascular endurance.").build()
            ));
        }

        if (foodRepository.count() == 0) {
            foodRepository.saveAll(List.of(
                    Food.builder().foodName("Grilled Chicken Breast").servingSize("100g").calories(165.0).protein(31.0).carbohydrates(0.0).fats(3.6).build(),
                    Food.builder().foodName("Cooked White Rice").servingSize("150g").calories(195.0).protein(4.2).carbohydrates(43.0).fats(0.4).build(),
                    Food.builder().foodName("Whole Egg (Boiled)").servingSize("1 large (50g)").calories(78.0).protein(6.3).carbohydrates(0.6).fats(5.3).build(),
                    Food.builder().foodName("Oatmeal (Cooked)").servingSize("1 cup (234g)").calories(158.0).protein(6.0).carbohydrates(27.0).fats(3.2).build(),
                    Food.builder().foodName("Banana").servingSize("1 medium (118g)").calories(105.0).protein(1.3).carbohydrates(27.0).fats(0.3).build(),
                    Food.builder().foodName("Salmon Fillet").servingSize("100g").calories(206.0).protein(22.0).carbohydrates(0.0).fats(12.0).build(),
                    Food.builder().foodName("Steamed Broccoli").servingSize("100g").calories(35.0).protein(2.8).carbohydrates(7.0).fats(0.4).build(),
                    Food.builder().foodName("Whey Protein Scoop").servingSize("1 scoop (30g)").calories(120.0).protein(24.0).carbohydrates(3.0).fats(1.5).build(),
                    Food.builder().foodName("Greek Yogurt (Plain)").servingSize("170g").calories(100.0).protein(17.0).carbohydrates(6.0).fats(0.7).build(),
                    Food.builder().foodName("Almonds").servingSize("30g (23 nuts)").calories(164.0).protein(6.0).carbohydrates(6.0).fats(14.0).build(),
                    Food.builder().foodName("Peanut Butter").servingSize("2 tbsp (32g)").calories(188.0).protein(8.0).carbohydrates(6.0).fats(16.0).build(),
                    Food.builder().foodName("Sweet Potato (Baked)").servingSize("150g").calories(135.0).protein(3.0).carbohydrates(31.0).fats(0.2).build()
            ));
        }
    }
}
