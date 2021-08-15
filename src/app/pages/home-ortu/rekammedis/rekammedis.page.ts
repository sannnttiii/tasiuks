import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rekammedis',
  templateUrl: './rekammedis.page.html',
  styleUrls: ['./rekammedis.page.scss'],
})
export class RekammedisPage implements OnInit {
  tabActive:string;
  constructor() { 
    this.tabActive="pemeriksaan";
  }

  ngOnInit() {
  }

}
