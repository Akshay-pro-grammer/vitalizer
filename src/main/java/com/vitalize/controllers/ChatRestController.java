// ChatController.java
package com.vitalize.controllers;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitalize.services.GeminiService;

@RestController
@RequestMapping("/chat")
public class ChatRestController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/send")
    public ResponseEntity<?> geminiString(@RequestBody Map<String, String> request) {
        // System.out.println(request.toString());
        String userMessage = request.get("message");

        // Call Gemini API using service layer
        String geminiResponse = geminiService.callApi(userMessage);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("response", geminiResponse));
    }

    private static final String OLLAMA_URL = "http://localhost:11434/api/generate";
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(java.time.Duration.ofSeconds(30)) // Increase timeout
            .build();

    @PostMapping("/sentiment")
    public String analyzeSentiment(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        String model=request.get("model");

        try {
            // Create JSON request body
            JSONObject json = new JSONObject();
            json.put("model", model); // Set the model name
            json.put("prompt", message);
            json.put("stream", false); // Disable streaming mode

            // Create HTTP request
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(OLLAMA_URL))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json.toString(), StandardCharsets.UTF_8))
                    .timeout(java.time.Duration.ofSeconds(60)) // Increase request timeout
                    .build();

            // Send request and get response
            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            // Return Ollama's response
            JSONObject jsonResponse = new JSONObject(response.body());
            return jsonResponse.optString("response", "No response received");

        } catch (IOException | InterruptedException e) {
            return "Error communicating with Ollama: " + e.getMessage();
        }
    }
    
}
