// ChatController.java
package com.vitalize.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/aichat")
public class ChatController {
    @RequestMapping("/chat")
    public String showChatPage() {
        return "aichat/chat"; // Refers to chat.html in the templates folder
    }
    @RequestMapping("/localchat")
    public String showLocalChatPage() {
        return "aichat/localchat"; // Refers to chat.html in the templates folder
    }
}
