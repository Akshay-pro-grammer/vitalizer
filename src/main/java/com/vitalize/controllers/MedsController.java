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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vitalize.forms.BodyForm;
import com.vitalize.forms.MedsForm;
import com.vitalize.helpers.AppConstants;
import com.vitalize.medical.RequestApiKey;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/meds")
public class MedsController {

    @Autowired
    private RequestApiKey requestApiKey;
    private Logger logger =LoggerFactory.getLogger(MedsController.class);

    @RequestMapping("/symptoms")
    public String symptoms(Model model) {
        
        //api part
        String apiKey = requestApiKey.getApiKey();

        // Build the API URL
        var url = AppConstants.health_url + "/symptoms?token=" + apiKey + "&language=" + AppConstants.language;

        // Create the HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        var client = HttpClient.newBuilder().build();

        try {
            // Send the request and get the response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Check if the response is successful
            if (response.statusCode() == 200) {
                // Parse the response body as JSON array
                JSONArray jsonArray = new JSONArray(response.body());
                logger.info("successfully fetched data from api: Symptoms ");
                // Convert JSONArray to List<Map<String, Object>>
                List<Map<String, Object>> symptomsList = new ArrayList<>();
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject symptom = jsonArray.getJSONObject(i);
                    Map<String, Object> symptomMap = new HashMap<>();
                    symptomMap.put("ID", symptom.getInt("ID"));
                    symptomMap.put("Name", symptom.getString("Name"));
                    symptomsList.add(symptomMap);
                }

                // Add the list to the model
                model.addAttribute("symptomsList", symptomsList);
                MedsForm m1 = new MedsForm();
                model.addAttribute("medsform", m1);

                // Return a view to display the symptoms (for example, "symptoms.html")
                return "meds/symptoms";
            } else {
                // Handle non-200 responses
                throw new RuntimeException("Failed to fetch data: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "An error occurred while fetching symptoms data.");
        }

        // In case of error, return to the home page
        return "home";
    }

    @PostMapping("/diagnosis")
public String getDiagnosis(@ModelAttribute MedsForm form, Model model) {
    String apiKey = requestApiKey.sendRequest().getString("Token");

    // Parse symptom IDs from form input
    List<Integer> symptomIds = Arrays.stream(form.getId().split(","))
            .map(String::trim)
            .filter(id -> !id.isEmpty() && id.matches("\\d+"))
            .map(Integer::parseInt)
            .collect(Collectors.toList());

    String symptomIdsJson = symptomIds.toString().replace(" ", "");

    // Build the API URL
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
            logger.info("successfully fetched data from api: Diagnosis ");
            List<Map<String, Object>> diagnosisResults = new ArrayList<>();

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject symptom = jsonArray.getJSONObject(i);
                Map<String, Object> daignosisMap = new HashMap<>();

                JSONObject issue = symptom.getJSONObject("Issue");
                daignosisMap.put("ID", issue.getInt("ID"));
                daignosisMap.put("Name", issue.getString("Name"));
                daignosisMap.put("ProfName", issue.getString("ProfName"));
                daignosisMap.put("Icd", issue.getString("Icd"));
                daignosisMap.put("IcdName", issue.getString("IcdName"));
                daignosisMap.put("Accuracy", issue.getInt("Accuracy"));

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
                daignosisMap.put("Specialisation", specialisations);

                diagnosisResults.add(daignosisMap);
            }

            model.addAttribute("diagnosisResults", diagnosisResults);
            model.addAttribute("medsform", form);

            return "meds/diagnosis";
        } else {
            model.addAttribute("error", "Failed to fetch data: Status Code " + response.statusCode());
            System.err.println("Error: Failed to fetch data with status code: " + response.statusCode());
        }
    } catch (Exception e) {
        e.printStackTrace();
        model.addAttribute("error", "An error occurred while fetching diagnosis data.");
        System.err.println("Exception: " + e.getMessage());
    }

    return "meds/diagnosis";
}
@RequestMapping("/body")
    public String bodyrel(Model model) {
        
        //api part
        String apiKey = requestApiKey.getApiKey();

        // Build the API URL
        var url = AppConstants.health_url + "/body/locations?token=" + apiKey + "&language=" + AppConstants.language;

        // Create the HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        var client = HttpClient.newBuilder().build();

        try {
            // Send the request and get the response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Check if the response is successful
            if (response.statusCode() == 200) {
                // Parse the response body as JSON array
                JSONArray jsonArray = new JSONArray(response.body());
                logger.info("successfully fetched data from api: body locations ");
                // Convert JSONArray to List<Map<String, Object>>
                List<Map<String, Object>> bodyList = new ArrayList<>();
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject body = jsonArray.getJSONObject(i);
                    Map<String, Object> bodyMap = new HashMap<>();
                    bodyMap.put("ID", body.getInt("ID"));
                    bodyMap.put("Name", body.getString("Name"));
                 bodyList.add(bodyMap);
                }

                // Add the list to the model
                model.addAttribute("bodyList", bodyList);
                BodyForm m1 = new BodyForm();
                model.addAttribute("m1", m1);

                // Return a view to display the symptoms (for example, "symptoms.html")
                return "meds/bodyrel";
            } else {
                // Handle non-200 responses
                throw new RuntimeException("Failed to fetch data: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "An error occurred while fetching symptoms data.");
        }

        // In case of error, return to the home page
        return "home";
    }
    
}
