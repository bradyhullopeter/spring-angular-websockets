package io.brady.springangularwebsockets.resources;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketResource {

  private final SimpMessagingTemplate simpMessagingTemplate;

  @Autowired
  WebSocketResource(SimpMessagingTemplate template) {
    this.simpMessagingTemplate = template;
  }

  @MessageMapping("/message")
  public void onReceivedMessage(String msg) {
    this.simpMessagingTemplate.convertAndSend("/chat", new SimpleDateFormat("HH:mm:ss").format(new Date()) + " - " + msg);
  }

}
