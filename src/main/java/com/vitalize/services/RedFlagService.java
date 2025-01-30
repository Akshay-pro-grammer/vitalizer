package com.vitalize.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalize.helpers.AppConstants;
import com.vitalize.medical.RequestApiKey;

@Service
public class RedFlagService {
    @Autowired
    private RequestApiKey requestApiKey;

    public String callApi(String id) {
        String apiKey = requestApiKey.getApiKey();
        String url = AppConstants.health_url + "/redflag" 
                     + "?token=" + apiKey 
                     + "&symptomId=" + id 
                     + "&language=" + AppConstants.language;
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
        
        HttpClient client = HttpClient.newHttpClient();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                return response.body();  // Directly returning the body
            } else {
                System.err.println("Error: Received status code " + response.statusCode());
            }
        } catch (Exception e) {

        }

        return ""; // Return an empty string if there's an error
    }
}
