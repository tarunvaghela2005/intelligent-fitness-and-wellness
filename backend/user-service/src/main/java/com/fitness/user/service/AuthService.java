package com.fitness.user.service;

import com.fitness.user.dto.request.LoginRequest;
import com.fitness.user.dto.request.RegisterRequest;
import com.fitness.user.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
