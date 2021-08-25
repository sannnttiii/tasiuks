import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-detailchat',
  templateUrl: './detailchat.page.html',
  styleUrls: ['./detailchat.page.scss'],
})
export class DetailchatPage implements OnInit {

  constructor() {
    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
  }

  ngOnInit() {
  }
  messages = [
    {
      user: 'Susi',
      createdAt: 1554090856000,
      msg: 'Halo pak Budi/bu Susan'
    },
    {
      user: 'Santi 6C - Budi Susan',
      createdAt: 1554090956000,
      msg: 'Halo bu Susi'
    },
    {
      user: 'Susi',
      createdAt: 1554091056000,
      msg: 'Ini anaknya abis vaksin'
    },
    {
      user: 'Susi',
      createdAt: 1554091056000,
      msg: 'Lah kok nangis'
    },
    {
      user: 'Susi',
      createdAt: 1554091056000,
      msg: 'Dikasih susu diem'
    }
  ];

  currentUser = 'Susi';
  newMsg = '';
  @ViewChild(IonContent) content: IonContent


  sendMessage() {
    this.messages.push({
      user: 'Susi',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    })
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    })

  }
}
