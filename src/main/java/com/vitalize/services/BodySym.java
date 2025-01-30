package com.vitalize.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalize.helpers.AppConstants;
import com.vitalize.medical.RequestApiKey;

@Service
public class BodySym {
    @Autowired
    private RequestApiKey requestApiKey;

    public List<Map<String, Object>> callApi(String id) {
        String apiKey = requestApiKey.getApiKey();
        String url = AppConstants.health_url + "/body/locations/" + id + "?token=" + apiKey + "&language=" + AppConstants.language;
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
        
        var client = HttpClient.newBuilder().build();
        List<Map<String, Object>> symptomsList = new ArrayList<>();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                JSONArray jsonArray = new JSONArray(response.body());
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject symptom = jsonArray.getJSONObject(i);
                    Map<String, Object> symptomMap = new HashMap<>();
                    symptomMap.put("ID", symptom.getInt("ID"));
                    symptomMap.put("Name", symptom.getString("Name"));
                    symptomsList.add(symptomMap);
                }
            } else {
                throw new RuntimeException("Failed to fetch data: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return symptomsList; // Return empty list if there's an error
    }
}
