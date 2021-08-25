import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, Message } from 'src/app/services/auth.service';

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
    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
    this.messages = this.as.getChatMessages();
  }

  sendMessage() {
    this.as.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
  }
  // messages = [
  //   {
  //     user: 'Susi petugas UKS',
  //     createdAt: 1554090856000,
  //     msg: 'Halo pak Budi/bu Susan'
  //   },
  //   {
  //     user: 'Santi 6C - Budi Susan',
  //     createdAt: 1554090956000,
  //     msg: 'Halo bu Susi'
  //   },
  //   {
  //     user: 'Susi petugas UKS',
  //     createdAt: 1554091056000,
  //     msg: 'Ini anaknya abis vaksin'
  //   },
  //   {
  //     user: 'Susi petugas UKS',
  //     createdAt: 1554091056000,
  //     msg: 'Lah kok nangis'
  //   },
  //   {
  //     user: 'Susi petugas UKS',
  //     createdAt: 1554091056000,
  //     msg: 'Dikasih susu diem'
  //   }
  // ];

  // currentUser = 'Santi 6C - Budi Susan';

  // sendMessage() {
  //   this.messages.push({
  //     user: 'Santi 6C - Budi Susan',
  //     createdAt: new Date().getTime(),
  //     msg: this.newMsg
  //   })
  //   this.newMsg = '';
  //   setTimeout(() => {
  //     this.content.scrollToBottom(200);
  //   })

  // }
}
