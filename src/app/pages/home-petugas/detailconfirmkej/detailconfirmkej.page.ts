import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailconfirmkej',
  templateUrl: './detailconfirmkej.page.html',
  styleUrls: ['./detailconfirmkej.page.scss'],
})
export class DetailconfirmkejPage implements OnInit {
  tabActive: string;
  constructor() {
    this.tabActive = "terima";
  }

  ngOnInit() {
  }

}
