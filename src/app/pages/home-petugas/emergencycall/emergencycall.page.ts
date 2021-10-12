import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-emergencycall',
  templateUrl: './emergencycall.page.html',
  styleUrls: ['./emergencycall.page.scss'],
})
export class EmergencycallPage implements OnInit {

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }

  callcenter() {
    this.callNumber.callNumber("112", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  damkar() {
    this.callNumber.callNumber("113", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  ambulans() {
    this.callNumber.callNumber("119", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  polisi() {
    this.callNumber.callNumber("110", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
