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
public class BodySubSymptom {
    @Autowired
    private RequestApiKey requestApiKey;

    public List<Map<String, Object>> callApi(String id, String gender) {
        String apiKey = requestApiKey.getApiKey();
        String url = AppConstants.health_url + "/symptoms/" + id + "/" + gender + "?token=" + apiKey + "&language=" + AppConstants.language;
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
    
        var client = HttpClient.newBuilder().build();
        List<Map<String, Object>> symptomsList = new ArrayList<>();
    
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() != 200) {
                throw new RuntimeException("Failed to fetch data: " + response.statusCode() + " " + response.body());
            }
            
            JSONArray jsonArray = new JSONArray(response.body());
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject symptom = jsonArray.getJSONObject(i);
                Map<String, Object> symptomMap = new HashMap<>();
                symptomMap.put("ID", symptom.getInt("ID"));
                symptomMap.put("Name", symptom.getString("Name"));
    
                // Store Synonyms as a List<String>
                JSONArray synonymsArray = symptom.optJSONArray("Synonyms");
                List<String> synonymsList = new ArrayList<>();
                if (synonymsArray != null) {
                    for (int j = 0; j < synonymsArray.length(); j++) {
                        synonymsList.add(synonymsArray.getString(j));
                    }
                }
                symptomMap.put("Synonyms", synonymsList);
    
                symptomsList.add(symptomMap);
            }
        } catch (Exception e) {
            // Consider logging the error with a logging framework instead of printStackTrace
            e.printStackTrace();
        }
    
        return symptomsList; // Return the list of symptoms
    }
    
    
}
