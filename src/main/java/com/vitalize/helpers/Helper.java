package com.vitalize.helpers;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class Helper {
    public static String getEmailOfLOggedInUser(Authentication authentication){
        if(authentication instanceof OAuth2AuthenticationToken){
            // var aOAuth2Token = (OAuth2AuthenticationToken) authentication;
            // var cliendId=aOAuth2Token.getAuthorizedClientRegistrationId();
            var oauth2User=(OAuth2User)authentication.getPrincipal();
            return oauth2User.getAttribute("email").toString();
        }
        else{
            return authentication.getName();
        }
    }
}
