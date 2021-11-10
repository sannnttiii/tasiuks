import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-daftarsiswa',
  templateUrl: './daftarsiswa.page.html',
  styleUrls: ['./daftarsiswa.page.scss'],
})
export class DaftarsiswaPage implements OnInit {

  constructor(private as: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listContact();
    this.listKelas();
  }

  ket = this.route.snapshot.params['ket'];
  contact = []
  kelaskontak = []
  isItemAvailable = false;
  items = []
  initializeItems() {
    // this.items = ["Ram","gopi", "dravid"];
    this.items = this.contact;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.namasiswa.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  listContact() {
    this.as.getListContact().subscribe(
      (data) => {
        this.contact = data;
      })
  }

  listKelas() {
    this.as.getListKelas().subscribe(
      (data) => {
        this.kelaskontak = data;
      }
    )
  }

}
