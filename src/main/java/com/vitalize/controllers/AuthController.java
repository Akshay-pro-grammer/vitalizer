package com.vitalize.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.vitalize.entities.User;
import com.vitalize.forms.UserForm;
import com.vitalize.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend requests
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserForm userForm, BindingResult result) {
        System.out.println("Api hit register");
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        System.out.println("Processing Registration request: " + userForm);

        User user = new User();
        user.setName(userForm.getName());
        user.setEmail(userForm.getEmail());
        user.setPassword(userForm.getPassword());
        user.setAbout(userForm.getAbout());
        user.setPhoneNumber(userForm.getPhoneNumber());
        user.setProfilePic("https://media.licdn.com/dms/image/D4D03AQEzKyFVXvXiOA/profile-displayphoto-shrink_100_100/0/1719461843892?e=1728518400&v=beta&t=gvsI3h_XUbY-GFQUWBc_CaKJV0btZoMCABAWONfCjbs");

        userService.saveUser(user);
        System.out.println("User saved successfully");

        return ResponseEntity.ok(Map.of("message", "Registration successful. Now you can login"));
    }
    // @Autowired

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpServletRequest request) {
    //     Optional<User> userOptional = userService.findByEmail(loginForm.getEmail());

    //     if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginForm.getPassword())) {
    //         HttpSession session = request.getSession();
    //         session.setAttribute("user", userOptional.get()); // Store user in session
    //         return ResponseEntity.ok(Map.of("message", "Login successful", "user", userOptional.get()));
    //     } else {
    //         return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    //     }
    // }

    // @GetMapping("/check")
    // public ResponseEntity<?> checkSession(HttpServletRequest request) {
    //     HttpSession session = request.getSession(false);
    //     if (session != null && session.getAttribute("user") != null) {
    //         return ResponseEntity.ok(Map.of("message", "User is logged in", "user", session.getAttribute("user")));
    //     }
    //     return ResponseEntity.status(401).body(Map.of("message", "User not logged in"));
    // }

    // @PostMapping("/logout")
    // public ResponseEntity<?> logout(HttpServletRequest request) {
    //     HttpSession session = request.getSession(false);
    //     if (session != null) {
    //         session.invalidate();
    //     }
    //     return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    // }
}
