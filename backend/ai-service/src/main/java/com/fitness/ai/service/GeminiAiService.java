package com.fitness.ai.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeminiAiService {

    @Value("${gemini.api.key:}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateRecommendation(String prompt, String fallbackResponse) {
        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("YOUR_")) {
            log.info("Gemini API key not configured. Using AI engine rule fallback.");
            return fallbackResponse;
        }

        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> parts = Map.of("parts", List.of(textPart));
            Map<String, Object> requestBody = Map.of("contents", List.of(parts));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List candidates = (List) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map content = (Map) candidate.get("content");
                    List resParts = (List) content.get("parts");
                    if (resParts != null && !resParts.isEmpty()) {
                        Map firstPart = (Map) resParts.get(0);
                        return (String) firstPart.get("text");
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Gemini API call failed, falling back to smart engine: {}", e.getMessage());
        }

        return fallbackResponse;
    }
}
