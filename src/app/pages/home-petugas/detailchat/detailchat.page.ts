import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, Message } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailchat',
  templateUrl: './detailchat.page.html',
  styleUrls: ['./detailchat.page.scss'],
})
export class DetailchatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  messages: Observable<Message[]>
  newMsg = '';
  ortuToken = '';
  constructor(private as: AuthService, private router: Router, public route: ActivatedRoute,) { }
  petugasUid = this.as.tokenUser;
  ngOnInit() {
    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
    this.messages = this.as.getChatMessages();
    this.as.ortuIdDb = this.route.snapshot.params['ortuid'];
    this.ortuToken = this.route.snapshot.params['ortutokendb'];
    console.log(this.as.ortuIdDb + this.as.petugasIdDb)
  }

  sendMessage() {
    this.as.addChatMessage(this.newMsg, this.ortuToken).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
    this.sendMessageDb(this.newMsg)
  }

  sendMessageDb(msg) {
    this.as.sendChatDb(this.as.ortuIdDb, this.as.petugasIdDb, msg, 1).subscribe(
      (data) => {
        if (data["status"]) {
          console.log("Berhasil add chat to DB")
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }


}
