package com.fitness.service.controller;

import com.fitness.service.model.ProgressRecord;
import com.fitness.service.repository.ProgressRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressRecordRepository progressRecordRepository;

    @GetMapping
    public ResponseEntity<List<ProgressRecord>> getProgress(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {
        List<ProgressRecord> records = progressRecordRepository.findByUserIdOrderByDateAsc(userId);
        return ResponseEntity.ok(records);
    }

    @PostMapping
    public ResponseEntity<ProgressRecord> logProgress(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @RequestBody ProgressRecord record) {

        record.setUserId(userId);
        if (record.getDate() == null) {
            record.setDate(LocalDate.now());
        }
        return ResponseEntity.ok(progressRecordRepository.save(record));
    }
}
