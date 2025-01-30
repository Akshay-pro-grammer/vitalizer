package com.vitalize.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vitalize.entities.User;
import com.vitalize.forms.UserForm;
import com.vitalize.helpers.Message;
import com.vitalize.helpers.MessageType;
import com.vitalize.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;


@Controller
public class PageController {
    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String index(Model model) {
        return "redirect:home";
    }
    @RequestMapping("/home")
    public String home(Model model) {
        model.addAttribute("name", "Vitalizer");
        model.addAttribute("title","Medical help app");
        System.out.println("home page handler");
        return "home";
    }
    @RequestMapping("/about")
    public String aboutPage(Model model) {
        System.out.println("about page handler");
        return "about";
    }
    @RequestMapping("/contact")
    public String contactPage(Model model) {
        System.out.println("about page handler");
        return "contact";
    }
    @RequestMapping("/services")
    public String services(Model model) {
        System.out.println("services page handler");
        return "services";
    }
    @RequestMapping("/login")
    public String loginpage(Model model) {
        System.out.println("services page handler");
        return "login";
    }
    @RequestMapping("/register")
    public String registerpage(Model model) {
        System.out.println("services page handler");
        UserForm userForm = new UserForm();
        model.addAttribute("userForm", userForm);
        return "register";
    }
    @PostMapping("/doregister")
    public String doRegister(@Valid @ModelAttribute UserForm userForm,BindingResult result ,HttpSession session) {
        System.out.println("processing Registration request");
        System.out.println(userForm);
        if(result.hasErrors()) {
            return "register";
        }
        // User user= User.builder()
        //             .name(userForm.getName())
        //             .password(userForm.getPassword())
        //             .email(userForm.getEmail())
        //             .phoneNumber(userForm.getPhoneNumber())
        //             .about(userForm.getAbout())
        //             .profilePic("https://media.licdn.com/dms/image/D4D03AQEzKyFVXvXiOA/profile-displayphoto-shrink_100_100/0/1719461843892?e=1728518400&v=beta&t=gvsI3h_XUbY-GFQUWBc_CaKJV0btZoMCABAWONfCjbs")
        //             .build();

        User user = new User();
        user.setName(userForm.getName());
        user.setEmail(userForm.getEmail());
        user.setPassword(userForm.getPassword());
        user.setAbout(userForm.getAbout());
        user.setPhoneNumber(userForm.getPhoneNumber());
        user.setProfilePic("https://media.licdn.com/dms/image/D4D03AQEzKyFVXvXiOA/profile-displayphoto-shrink_100_100/0/1719461843892?e=1728518400&v=beta&t=gvsI3h_XUbY-GFQUWBc_CaKJV0btZoMCABAWONfCjbs");

        userService.saveUser(user);
        System.out.println("user saved");
        Message message = Message.builder().content("Registration successfull. Now you can login").type(MessageType.blue).build();
        session.setAttribute("message", message);
        return "redirect:/register";
    }
    
}
