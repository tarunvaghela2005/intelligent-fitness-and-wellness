package com.fitness.user.controller;

import com.fitness.user.dto.request.UpdateProfileRequest;
import com.fitness.user.dto.response.ApiResponse;
import com.fitness.user.dto.response.UserResponse;
import com.fitness.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(@RequestHeader("X-Auth-User-Id") Long userId) {
        UserResponse response = userService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success("User profile retrieved", response));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @RequestHeader("X-Auth-User-Id") Long userId,
            @RequestBody UpdateProfileRequest request) {
        UserResponse response = userService.updateUserProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.success("User profile updated successfully", response));
    }
}
