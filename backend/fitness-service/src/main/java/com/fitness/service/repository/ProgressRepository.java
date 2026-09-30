package com.fitness.service.repository;

import com.fitness.service.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByUserIdOrderByRecordedDateDesc(Long userId);
}
