package com.fitness.user.controller;

import com.fitness.user.dto.UserProfileDto;
import com.fitness.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(@RequestHeader(value = "X-User-Email", required = false) String email) {
        String userEmail = email != null ? email : "tarun@example.com";
        return ResponseEntity.ok(userService.getUserProfile(userEmail));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateProfile(
            @RequestHeader(value = "X-User-Email", required = false) String email,
            @RequestBody UserProfileDto profileDto) {
        String userEmail = email != null ? email : "tarun@example.com";
        return ResponseEntity.ok(userService.updateUserProfile(userEmail, profileDto));
    }
}
