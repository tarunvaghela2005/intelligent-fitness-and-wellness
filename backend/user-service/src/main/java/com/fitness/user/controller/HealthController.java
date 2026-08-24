package com.fitness.user.controller;

import com.fitness.user.dto.HealthMetricsDto;
import com.fitness.user.model.HealthMetrics;
import com.fitness.user.model.User;
import com.fitness.user.service.HealthDiagnosticsService;
import com.fitness.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {

    private final HealthDiagnosticsService healthDiagnosticsService;
    private final UserService userService;

    @GetMapping("/metrics")
    public ResponseEntity<HealthMetricsDto> getMetrics(@RequestHeader(value = "X-User-Email", required = false) String email) {
        String userEmail = email != null ? email : "tarun@example.com";
        User user = userService.getEntityByEmail(userEmail);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        HealthMetrics metrics = healthDiagnosticsService.calculateAndSaveMetrics(user);
        return ResponseEntity.ok(healthDiagnosticsService.convertToDto(metrics));
    }

    @PostMapping("/calculate")
    public ResponseEntity<HealthMetricsDto> calculateMetrics(
            @RequestHeader(value = "X-User-Email", required = false) String email) {
        String userEmail = email != null ? email : "tarun@example.com";
        User user = userService.getEntityByEmail(userEmail);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        HealthMetrics metrics = healthDiagnosticsService.calculateAndSaveMetrics(user);
        return ResponseEntity.ok(healthDiagnosticsService.convertToDto(metrics));
    }
}
