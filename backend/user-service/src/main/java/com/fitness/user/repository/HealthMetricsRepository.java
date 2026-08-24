package com.fitness.user.repository;

import com.fitness.user.model.HealthMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface HealthMetricsRepository extends JpaRepository<HealthMetrics, Long> {
    Optional<HealthMetrics> findByUserId(Long userId);
}
