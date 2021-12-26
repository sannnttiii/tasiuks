import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Message, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  messages: Observable<Message[]>
  newMsg = '';
  constructor(private as: AuthService, private router: Router) { }

  ngOnInit() {
    this.listChat();
  }
  chats = []
  listChat() {
    this.as.getListChat(this.as.petugasIdDb).subscribe(
      (data) => {
        this.chats = data;
      }
    )
  }


}
