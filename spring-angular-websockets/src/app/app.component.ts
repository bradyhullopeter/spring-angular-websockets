import {Component} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverUrl = 'http://localhost:8080/socket'
  private stompClient;
  private messages: string[] = [];
  private newMessage: string = '';

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe("/chat", message => {
        if (message.body) {
          this.messages.push(message.body);
        }
      });
    });
  }

  sendMessage() {
    console.log(this.newMessage);
    this.stompClient.send("/app/message", {}, this.newMessage || 'empty message sent');
    this.newMessage = '';
  }
}
