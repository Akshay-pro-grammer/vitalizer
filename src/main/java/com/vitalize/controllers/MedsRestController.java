package com.vitalize.controllers;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.vitalize.services.BodySym;
import com.vitalize.services.RedFlagService;
import com.vitalize.helpers.AppConstants;
import com.vitalize.medical.RequestApiKey;
import com.vitalize.services.BodySubSymptom;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/meds")
public class MedsRestController {

    @Autowired
    private BodySym bodySub;
    @Autowired
    private BodySubSymptom subSymptom;
    @Autowired
    private RedFlagService redFlagService;
    @Autowired
    private RequestApiKey  requestApiKey;

    // New API to replace Thymeleaf serving method
    @GetMapping("/bodies")
    public ResponseEntity<List<Map<String, Object>>> getBodyParts() {
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
                // logger.info("successfully fetched data from api: body locations ");
                // Convert JSONArray to List<Map<String, Object>>
                List<Map<String, Object>> bodyList = new ArrayList<>();
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject body = jsonArray.getJSONObject(i);
                    Map<String, Object> bodyMap = new HashMap<>();
                    bodyMap.put("ID", body.getInt("ID"));
                    bodyMap.put("Name", body.getString("Name"));
                 bodyList.add(bodyMap);
                }

                return ResponseEntity.ok(bodyList);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(List.of(Map.of("error", "Failed to fetch data")));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of(Map.of("error", "An error occurred while fetching data.")));
        }
    }

    @PostMapping("/subbody")
    public ResponseEntity<List<Map<String, Object>>> getSubBodyParts(@RequestParam("ids") String bodyId) {
        List<Map<String, Object>> bodysubResponse = bodySub.callApi(bodyId);

        if (bodysubResponse == null || bodysubResponse.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(List.of(Map.of("error", "Unable to fetch data for the provided ID.")));
        }

        return ResponseEntity.ok(bodysubResponse);
    }

    @PostMapping("/subsymptom")
    public ResponseEntity<List<Map<String, Object>>> getSymptoms(@RequestParam("ids") String bodyId,
                                                                  @RequestParam("gender") String gender) {
        if (bodyId == null || bodyId.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(List.of(Map.of("error", "Body ID must not be empty.")));
        }

        List<Map<String, Object>> subResponse = subSymptom.callApi(bodyId, gender);

        if (subResponse.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(List.of(Map.of("error", "Unable to fetch data for the provided ID.")));
        }

        return ResponseEntity.ok(subResponse);
    }

    @PostMapping("/isredflag")
    public ResponseEntity<JSONObject> checkRedFlag(@RequestParam("ids") String bodyId) {
        String redFlagResponse = redFlagService.callApi(bodyId);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("redFlagResponse", redFlagResponse != null ? redFlagResponse : "");

        return ResponseEntity.ok(jsonObject);
    }
}
