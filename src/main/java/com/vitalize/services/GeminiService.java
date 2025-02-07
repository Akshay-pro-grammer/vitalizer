package com.vitalize.services;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.json.JSONArray;
import org.json.JSONObject;
import com.vitalize.helpers.AppConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GeminiService {

    @Autowired
    private RestTemplate restTemplate;
    private final String geminiApiKey;

    public GeminiService() {
        Dotenv dotenv = Dotenv.configure().load();
        this.geminiApiKey = dotenv.get("GEMINI_API_KEY");
    }

    public String callApi(String prompt) {
        String apiUrl = String.format(AppConstants.API_URL_TEMPLATE, geminiApiKey);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // Prepare the JSON request body
        JSONObject partsNode = new JSONObject();
        partsNode.put("text", prompt);

        JSONArray partsArray = new JSONArray();
        partsArray.put(partsNode);

        JSONObject contentNode = new JSONObject();
        contentNode.put("parts", partsArray);

        JSONArray contentsArray = new JSONArray();
        contentsArray.put(contentNode);

        JSONObject requestBodyNode = new JSONObject();
        requestBodyNode.put("contents", contentsArray);
        // System.out.println(requestBodyNode.toString());

        HttpEntity<String> request = new HttpEntity<>(requestBodyNode.toString(), headers);
        Logger log=LoggerFactory.getLogger(GeminiService.class);
        try {
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("api fetch successful");
                return extractResponse(response.getBody());

            } else {
                throw new RuntimeException("API call failed with status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to call Gemini API", e);
        }
    }

    private String extractResponse(String responseBody) {
        try {
            JSONObject rootNode = new JSONObject(responseBody);
            JSONArray candidatesArray = rootNode.optJSONArray("candidates");
            if (candidatesArray != null && candidatesArray.length() > 0) {
                JSONObject firstCandidate = candidatesArray.getJSONObject(0);
                JSONObject content = firstCandidate.optJSONObject("content");

                if (content != null) {
                    JSONArray partsArray = content.optJSONArray("parts");

                    if (partsArray != null && partsArray.length() > 0) {
                        return partsArray.getJSONObject(0).optString("text", "No response content found as length was zero");
                    }
                }
            }

            return "No response content found";
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse API response", e);
        }
    }
}
