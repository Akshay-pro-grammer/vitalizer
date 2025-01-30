package com.vitalize.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.vitalize.entities.User;
import com.vitalize.helpers.Helper;
import com.vitalize.services.UserService;

@ControllerAdvice
public class RootController {
    @Autowired
    private UserService userService;
    Logger logger =LoggerFactory.getLogger(RootController.class);
    @ModelAttribute
    public void addLoggedInUserInfo(Model model,Authentication auth){
        if(auth==null){
            return;
        }
        String email = Helper.getEmailOfLOggedInUser(auth);
        // logger.info("User Logged In: {} ",email);
        User user=userService.getUserByEmail(email);
        model.addAttribute("loggedIn",user);
    }

}
