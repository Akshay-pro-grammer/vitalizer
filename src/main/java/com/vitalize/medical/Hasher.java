package com.vitalize.medical;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.vitalize.helpers.AppConstants;

import java.util.Base64;
import java.nio.charset.StandardCharsets;

@Service
public class Hasher {
    
    public static String computeHmacMd5(String data, String secretKey) throws Exception {
        String algorithm = "HmacMD5";
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), algorithm);
        Mac mac = Mac.getInstance(algorithm);
        mac.init(secretKeySpec);
        
        byte[] hmacData = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hmacData);
    }

    public String generateToken() { 
        try { 
            String password = AppConstants.password;  // Replace with your actual secret key
            String authUrl = AppConstants.auth_url;
            String rawHashString = computeHmacMd5(authUrl, password);
            return rawHashString;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
