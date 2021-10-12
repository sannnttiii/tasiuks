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
    this.messages = this.as.getChatMessages();
    this.getIdPetugasAktif()
    this.content.scrollToBottom();

  }

  userToken = this.as.tokenUser;
  ortuIdDb = this.as.ortuIdDb;
  // petugasIdDb = 0;
  petugasToken = '';
  msg = ''
  getIdPetugasAktif() {
    this.as.getPetugasAktif().subscribe(
      (data) => {
        this.as.petugasIdDb = data[0]['id'];
        this.petugasToken = data[0]['usertoken'];
        console.log('petugas aktif' + this.petugasToken);
      }
    )
  }

  sendMessage() {
    this.as.addChatMessage(this.newMsg, this.petugasToken).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
    this.sendMessageDb(this.newMsg)
  }

  sendMessageDb(msg) {
    this.as.sendChatDb(this.ortuIdDb, this.as.petugasIdDb, msg, 0).subscribe(
      (data) => {
        if (data["status"]) {
          console.log("Berhasil add chat to DB")
        }
        else {
          console.log("Gagal add chat to DB")
        }
      }
    )
  }

}
