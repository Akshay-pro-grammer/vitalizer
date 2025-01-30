package com.vitalize.medical;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalize.helpers.AppConstants;

@Service
public class RequestApiKey {

    @Autowired
    private Hasher hashed;

    // Cache for storing the API key and its expiration time
    private ConcurrentHashMap<String, String> apiKeyCache = new ConcurrentHashMap<>();
    private LocalDateTime apiKeyExpiration = LocalDateTime.MIN;  // Set initial expiration to force an API request

    // Method to get the API key (cached or new)
    public String getApiKey() {
        // Check if the cached key is valid
        if (apiKeyCache.containsKey("Token") && apiKeyExpiration.isAfter(LocalDateTime.now())) {
            System.out.println("Using cached API key.");
            return apiKeyCache.get("Token");
        }

        // Fetch a new API key if expired or not present
        JSONObject response = sendRequest();
        if (response != null && response.has("Token") && response.has("ValidThrough")) {
            String newApiKey = response.getString("Token");
            int validThroughSeconds = response.getInt("ValidThrough");
            cacheApiKey(newApiKey, validThroughSeconds);  // Cache the new API key with the valid duration
            return newApiKey;
        } else {
            throw new RuntimeException("Failed to retrieve a valid API key.");
        }
    }

    // Cache the API key and dynamically set its expiration time
    private void cacheApiKey(String apiKey, int validThroughSeconds) {
        apiKeyCache.put("Token", apiKey);
        // Set the expiration time based on the "ValidThrough" field from the API response
        apiKeyExpiration = LocalDateTime.now().plus(validThroughSeconds, ChronoUnit.SECONDS);
        System.out.println("API key cached with expiration at " + apiKeyExpiration);
    }

    // Method to send the API request and retrieve the API key
    public JSONObject sendRequest() {
        String authorization = "Bearer " + AppConstants.username + ":" + hashed.generateToken();
        var url = AppConstants.auth_url;
        JSONObject jsonBody = new JSONObject(); // Add actual JSON body if needed

        // Build HttpRequest with headers and body
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .header("Authorization", authorization)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody.toString()))
                .build();

        var client = HttpClient.newBuilder().build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                return new JSONObject(response.body());
            } else {
                throw new RuntimeException("Failed to fetch data: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
