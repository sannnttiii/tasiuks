import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailconfirm',
  templateUrl: './detailconfirm.page.html',
  styleUrls: ['./detailconfirm.page.scss'],
})
export class DetailconfirmPage implements OnInit {
  tabActive: string;
  constructor() {
    this.tabActive = "terima";
  }

  ngOnInit() {
  }

}
