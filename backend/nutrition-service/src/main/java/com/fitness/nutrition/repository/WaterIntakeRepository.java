package com.fitness.nutrition.repository;

import com.fitness.nutrition.model.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {
    List<WaterIntake> findByUserIdOrderByDateDesc(Long userId);
    List<WaterIntake> findByUserIdAndDate(Long userId, LocalDate date);
}
