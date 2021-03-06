import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController, IonContent } from '@ionic/angular';
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
  ortuDevice = '';
  constructor(private alertController: AlertController, private datePipe: DatePipe, private http: HttpClient, private callNumber: CallNumber, private as: AuthService, private router: Router, public route: ActivatedRoute,) { }
  petugasUid = this.as.tokenUser;
  ngOnInit() {
    this.messages = this.as.getChatMessages();
    this.as.ortuIdDb = this.route.snapshot.params['ortuid'];
    this.ortuToken = this.route.snapshot.params['ortutokendb'];
    this.ortuDevice = this.route.snapshot.params['ortutokendevice'];
    this.detailOrtu();
    this.updateRead();
    // console.log(this.as.ortuIdDb + this.as.petugasIdDb)
    this.scrollBottom();
  }
  scrollBottom() {
    this.content.scrollToBottom();
    // console.log(this.content + 'terpanggil');
  }

  noIbu = '';
  noAyah = '';
  detailOrtu() {
    this.as.listDetailOrtu(this.as.ortuIdDb).subscribe(
      (data) => {
        this.noIbu = data['pesan'][0]['noibu'];
        this.noAyah = data['pesan'][0]['noayah'];
      }
    )
  }
  today;
  formatted;
  tglakhirkejadian;
  kejadianid;
  async call() {
    this.callNumber.callNumber(this.noIbu, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    console.log('Confirm call ortu.');

    this.today = Date.now();
    this.formatted = this.datePipe.transform(this.today, 'yyyy-MM-dd')
    this.as.getLastKejadianSiswa(this.as.ortuIdDb).subscribe((data) => {
      if (data['status']) {
        this.tglakhirkejadian = this.datePipe.transform(data['pesan']['0']['tanggal'], 'yyyy-MM-dd');
        this.kejadianid = data['pesan']['0']['id']
        if (this.tglakhirkejadian == this.formatted) {
          const formData = new FormData();
          formData.append('catatan', 'Petugas UKS melakukan panggilan ke orang tua');
          formData.append('kejadianid', this.kejadianid);

          this.http.post("http://192.168.1.6/tasiuks/api/insertdetailkejadian.php", formData).subscribe(
            (data) => {
              console.log(data['pesan'])
            });
        }
      }

    })
  }

  sendMessage() {
    this.as.addChatMessage(this.newMsg, this.ortuToken).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
    this.sendMessageDb(this.newMsg)
    var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

    var to = this.ortuDevice;
    var notification = {
      'title': 'Pesan Baru Diterima',
      'body': 'Anda mendapatkan pesan baru.',
      // 'icon': 'https://rekreartive.com/wp-content/uploads/2019/04/Logo-UKS-Usaha-Kesehatan-Sekolah-Warna.png',
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
    console.log(to);

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

  updateRead() {
    this.as.updatePesanTerbacaPetugas(this.as.petugasIdDb, this.as.ortuIdDb).subscribe(
      (data) => {
        console.log(data['pesan']);
      }
    )
  }

}
