package com.vitalize.controllers;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vitalize.forms.MedsForm;
import com.vitalize.helpers.AppConstants;
import com.vitalize.medical.RequestApiKey;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/meds")
public class MedsMainRestController {

    @Autowired
    private RequestApiKey requestApiKey;
    private Logger logger = LoggerFactory.getLogger(MedsMainRestController.class);

    @GetMapping("/symptoms")
    public List<Map<String, Object>> getSymptoms() {
        String apiKey = requestApiKey.getApiKey();
        String url = AppConstants.health_url + "/symptoms?token=" + apiKey + "&language=" + AppConstants.language;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpClient client = HttpClient.newBuilder().build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                JSONArray jsonArray = new JSONArray(response.body());
                logger.info("Successfully fetched symptoms from API.");
                List<Map<String, Object>> symptomsList = new ArrayList<>();
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject symptom = jsonArray.getJSONObject(i);
                    Map<String, Object> symptomMap = new HashMap<>();
                    symptomMap.put("ID", symptom.getInt("ID"));
                    symptomMap.put("Name", symptom.getString("Name"));
                    symptomsList.add(symptomMap);
                }
                // System.out.println(symptomsList);
                return symptomsList;
            } else {
                throw new RuntimeException("Failed to fetch symptoms: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching symptoms", e);
        }
    }

    @PostMapping("/diagnosis")
    public List<Map<String, Object>> getDiagnosis(@RequestBody MedsForm form) {
        String apiKey = requestApiKey.sendRequest().getString("Token");

        List<Integer> symptomIds = Arrays.stream(form.getId().split(","))
                .map(String::trim)
                .filter(id -> !id.isEmpty() && id.matches("\\d+"))
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        String symptomIdsJson = symptomIds.toString().replace(" ", "");
        String url = AppConstants.health_url + "/diagnosis?token=" + apiKey
                + "&language=" + AppConstants.language
                + "&symptoms=" + symptomIdsJson
                + "&gender=" + form.getGender().trim()
                + "&year_of_birth=" + form.getYearofbirth();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpClient client = HttpClient.newBuilder().build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
            if (response.statusCode() == 200) {
                JSONArray jsonArray = new JSONArray(response.body());
                logger.info("Successfully fetched diagnosis from API.");
                
                List<Map<String, Object>> diagnosisResults = new ArrayList<>();
        
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject symptom = jsonArray.getJSONObject(i);
                    Map<String, Object> diagnosisMap = new HashMap<>();
        
                    JSONObject issue = symptom.getJSONObject("Issue");
                    diagnosisMap.put("ID", issue.getInt("ID"));
                    diagnosisMap.put("Name", issue.getString("Name"));
                    diagnosisMap.put("ProfName", issue.getString("ProfName"));
                    diagnosisMap.put("Icd", issue.getString("Icd"));
                    diagnosisMap.put("IcdName", issue.getString("IcdName"));
                    diagnosisMap.put("Accuracy", issue.getInt("Accuracy"));
        
                    // Extract Specialisations
                    List<Map<String, Object>> specialisations = new ArrayList<>();
                    JSONArray specialisationArray = symptom.getJSONArray("Specialisation");
                    for (int j = 0; j < specialisationArray.length(); j++) {
                        JSONObject spec = specialisationArray.getJSONObject(j);
                        Map<String, Object> specMap = new HashMap<>();
                        specMap.put("ID", spec.getInt("ID"));
                        specMap.put("Name", spec.getString("Name"));
                        specMap.put("SpecialistID", spec.getInt("SpecialistID"));
                        specialisations.add(specMap);
                    }
                    diagnosisMap.put("Specialisation", specialisations);
        
                    diagnosisResults.add(diagnosisMap);
                }
        
                return diagnosisResults;  // ✅ Now returning JSON with full details!
            } else {
                throw new RuntimeException("Failed to fetch diagnosis: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching diagnosis", e);
        }
        
    }
}
