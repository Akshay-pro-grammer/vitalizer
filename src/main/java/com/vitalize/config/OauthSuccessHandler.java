package com.vitalize.config;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.vitalize.entities.Providers;
import com.vitalize.entities.User;
import com.vitalize.helpers.AppConstants;
import com.vitalize.repositories.UserRepo;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OauthSuccessHandler implements AuthenticationSuccessHandler{

    @Autowired
    private UserRepo userRepo;
    Logger logger=LoggerFactory.getLogger(OauthSuccessHandler.class);
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
                logger.info("Oauth Success");
                DefaultOAuth2User user = (DefaultOAuth2User)authentication.getPrincipal();
                String name=user.getAttribute("name").toString();
                String email=user.getAttribute("email").toString();
                String picture=user.getAttribute("picture").toString();
                User user1=new User();
                user1.setName(name);
                user1.setEmail(email);
                user1.setProfilePic(picture);
                user1.setPassword("dummy");
                user1.setUserId(UUID.randomUUID().toString());
                user1.setProvider(Providers.GOOGLE);
                user1.setEnabled(true);
                user1.setVerifiedEmail(true);
                user1.setProviderId(user.getName());
                user1.setRoles(List.of(AppConstants.ROLE_USER));
                user1.setAbout("This account was created using Google");

                User user2=userRepo.findByEmail(email).orElse(null);
                if(user2==null)
                {
                    userRepo.save(user1);
                    logger.info("user saved");
                }
                new DefaultRedirectStrategy().sendRedirect(request, response, "/home");
    }

}