import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController, IonContent } from '@ionic/angular';
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
  constructor(private as: AuthService, private router: Router, private callNumber: CallNumber, private alertController: AlertController) { }

  ngOnInit() {
    this.messages = this.as.getChatMessages();
    this.getIdPetugasAktif()
    this.scrollToBottomSetTimeOut();
    this.updateReadMessage();
  }
  scrollToBottomSetTimeOut() {

    setTimeout(() => {
      this.content.scrollToBottom(30);
    }, 30);
  }

  userToken = this.as.tokenUser;
  ortuIdDb = this.as.ortuIdDb;
  // petugasIdDb = 0;
  petugasToken = '';
  msg = ''
  petugasDevice = '';
  getIdPetugasAktif() {
    this.as.getPetugasAktif().subscribe(
      (data) => {
        this.as.petugasIdDb = data[0]['id'];
        this.petugasToken = data[0]['usertoken'];
        this.petugasDevice = data[0]['tokendevice'];
        this.telp = data[0]['telp'];
        console.log('petugas aktif' + this.petugasToken);
      }
    )
  }
  telp = '';
  async call() {
    this.callNumber.callNumber(this.telp, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    console.log('Confirm call petugas.');
  }
  sendMessage() {
    this.as.addChatMessage(this.newMsg, this.petugasToken).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
    this.sendMessageDb(this.newMsg)

    var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

    var to = this.petugasDevice;
    var notification = {
      'title': 'Pesan Baru Diterima',
      'body': 'Anda mendapatkan pesan baru.',
      'icon': 'https://rekreartive.com/wp-content/uploads/2019/04/Logo-UKS-Usaha-Kesehatan-Sekolah-Warna.png',
      // 'click_action': 'FCM_PLUGIN_ACTIVITY'
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'to': to
      })
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.error(error);
    })
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

  updateReadMessage() {
    this.as.updatePesanTerbacaOrtu(this.ortuIdDb).subscribe(
      (data) => {
        console.log(data['pesan'])
      })
  }
}
