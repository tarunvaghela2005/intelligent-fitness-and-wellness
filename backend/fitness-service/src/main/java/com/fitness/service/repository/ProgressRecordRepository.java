package com.fitness.service.repository;

import com.fitness.service.model.ProgressRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProgressRecordRepository extends JpaRepository<ProgressRecord, Long> {
    List<ProgressRecord> findByUserIdOrderByDateAsc(Long userId);
}
