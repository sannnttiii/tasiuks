import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    })
  }
  messages =[
    {
      user:'Susi petugas UKS',
      createdAt:1554090856000,
      msg : 'Halo bu Susan'
    },
    {
      user:'Susan',
      createdAt:1554090956000,
      msg : 'Halo bu Susi'
    },
    {
      user:'Susi petugas UKS',
      createdAt:1554091056000,
      msg : 'Ini anaknya abis vaksin'
    },
    {
      user:'Susi petugas UKS',
      createdAt:1554091056000,
      msg : 'Lah kok nangis'
    },
    {
      user:'Susi petugas UKS',
      createdAt:1554091056000,
      msg : 'Dikasih susu diem'
    }
  ];

  currentUser = 'Susan';
  newMsg='';
  @ViewChild(IonContent) content:IonContent


  sendMessage(){
    this.messages.push({
      user:'Susan',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    })
    this.newMsg='';
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    })
   
  }
}
