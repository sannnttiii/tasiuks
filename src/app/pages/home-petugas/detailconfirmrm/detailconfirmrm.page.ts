import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailconfirmrm',
  templateUrl: './detailconfirmrm.page.html',
  styleUrls: ['./detailconfirmrm.page.scss'],
})
export class DetailconfirmrmPage implements OnInit {
  tabActive: string;
  constructor() {
    this.tabActive = "terima";
  }

  ngOnInit() {
  }

}
