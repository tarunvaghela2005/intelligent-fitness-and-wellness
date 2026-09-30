package com.fitness.nutrition.config;

import com.fitness.nutrition.model.Food;
import com.fitness.nutrition.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NutritionDataInitializer implements CommandLineRunner {

    private final FoodRepository foodRepository;

    @Override
    public void run(String... args) {
        if (foodRepository.count() == 0) {
            foodRepository.saveAll(List.of(
                    Food.builder().name("White Rice").category("Grain").calories(130.0).protein(2.7).carbohydrates(28.0).fat(0.3).servingSize("100g").build(),
                    Food.builder().name("Wheat Roti / Chapati").category("Grain").calories(104.0).protein(3.1).carbohydrates(17.5).fat(2.3).servingSize("1 piece (35g)").build(),
                    Food.builder().name("Boiled Egg").category("Protein").calories(78.0).protein(6.3).carbohydrates(0.6).fat(5.3).servingSize("1 large (50g)").build(),
                    Food.builder().name("Cow Milk (Whole)").category("Dairy").calories(149.0).protein(7.7).carbohydrates(11.7).fat(8.0).servingSize("1 cup (244g)").build(),
                    Food.builder().name("Banana").category("Fruit").calories(105.0).protein(1.3).carbohydrates(27.0).fat(0.3).servingSize("1 medium (118g)").build(),
                    Food.builder().name("Apple").category("Fruit").calories(95.0).protein(0.5).carbohydrates(25.0).fat(0.3).servingSize("1 medium (182g)").build(),
                    Food.builder().name("Grilled Chicken Breast").category("Protein").calories(165.0).protein(31.0).carbohydrates(0.0).fat(3.6).servingSize("100g").build(),
                    Food.builder().name("Paneer (Cottage Cheese)").category("Dairy").calories(265.0).protein(18.3).carbohydrates(1.2).fat(20.8).servingSize("100g").build(),
                    Food.builder().name("Yellow Dal (Cooked)").category("Protein").calories(160.0).protein(9.0).carbohydrates(27.0).fat(2.0).servingSize("1 cup (200g)").build(),
                    Food.builder().name("Rolled Oats (Cooked)").category("Grain").calories(158.0).protein(6.0).carbohydrates(27.0).fat(3.2).servingSize("1 cup (234g)").build()
            ));
        }
    }
}
