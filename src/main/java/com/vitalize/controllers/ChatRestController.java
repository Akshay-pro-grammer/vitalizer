// ChatController.java
package com.vitalize.controllers;

import java.io.IOException;
import java.net.ConnectException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitalize.services.GeminiService;

import io.github.ollama4j.OllamaAPI;
import io.github.ollama4j.exceptions.OllamaBaseException;
import io.github.ollama4j.models.OllamaResult;
import io.github.ollama4j.utils.OptionsBuilder;

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
    @PostMapping("/sentiment")
    public String ollamaString(@RequestBody Map<String, String> request) throws OllamaBaseException, IOException, InterruptedException {
        OllamaResult result=null;
        try {
            
            String host = "http://localhost:11434/";
    
            OllamaAPI ollamaAPI = new OllamaAPI(host);
    
            result =
                    ollamaAPI.generate("llama3.2:1b", request.get("message"),false, new OptionsBuilder().build());
        } catch (ConnectException e) {
            return "Ollama is offline";
        }

            return result.getResponse();
    }
}

