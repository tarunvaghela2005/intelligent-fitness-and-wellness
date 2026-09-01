package com.fitness.user.service;

import com.fitness.user.dto.request.UpdateProfileRequest;
import com.fitness.user.dto.response.UserResponse;
import com.fitness.user.model.User;

public interface UserService {
    UserResponse getUserById(Long userId);
    UserResponse updateUserProfile(Long userId, UpdateProfileRequest request);
    User getEntityByEmail(String userEmail);
}
