package com.fitness.nutrition.repository;

import com.fitness.nutrition.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByUserIdOrderByDateDesc(Long userId);
    List<Meal> findByUserIdAndDate(Long userId, LocalDate date);
}
