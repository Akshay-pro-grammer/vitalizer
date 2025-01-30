package com.vitalize.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.vitalize.services.BodySym;
import com.vitalize.services.RedFlagService;

import net.minidev.json.JSONObject;

import com.vitalize.services.BodySubSymptom;

@RestController
@RequestMapping("/meds")
public class MedsRestController {

    @Autowired
    private BodySym bodySub;
    @Autowired
    private BodySubSymptom subSymptom;
    @Autowired
    private RedFlagService redFlagService;

    @PostMapping("/subbody")
    public ResponseEntity<List<Map<String, Object>>> sendMessage(@RequestParam("ids") String bodyId) {
        List<Map<String, Object>> bodysubResponse = bodySub.callApi(bodyId);

        if (bodysubResponse == null || bodysubResponse.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(List.of(Map.of("error", "Unable to fetch data for the provided ID.")));
        }

        return ResponseEntity.ok(bodysubResponse);
    }

    @PostMapping("/subsymptom")
    public ResponseEntity<List<Map<String, Object>>> sendMessage2(@RequestParam("ids") String bodyId,
            @RequestParam("gender") String gender) {
        // Optional: Validate inputs
        if (bodyId == null || bodyId.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(List.of(Map.of("error", "Body ID must not be empty.")));
        }

        // Call the service to fetch symptoms
        List<Map<String, Object>> subResponse = subSymptom.callApi(bodyId, gender);

        // Check if the response is empty
        if (subResponse.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(List.of(Map.of("error", "Unable to fetch data for the provided ID.")));
        }

        // Return the successful response
        return ResponseEntity.ok(subResponse);
    }

    @PostMapping("/isredflag")
    public JSONObject checkRedFlag(@RequestParam("ids") String bodyId) {
        String redFlagResponse = redFlagService.callApi(bodyId);
        
        // Create a JSON object to hold the response
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("redFlagResponse", redFlagResponse != null ? redFlagResponse : "");
    
        return jsonObject;
    }
    

}
