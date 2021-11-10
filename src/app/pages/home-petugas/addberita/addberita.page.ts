import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addberita',
  templateUrl: './addberita.page.html',
  styleUrls: ['./addberita.page.scss'],
})
export class AddberitaPage implements OnInit {

  constructor(public datepipe: DatePipe, private route: ActivatedRoute, private as: AuthService, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  kejadianid = this.route.snapshot.params['idkejadian']
  file: File;
  changeListener($event): void {
    this.file = $event.target.files[0];
  }
  onChangeDate(event) {
    // console.log(event.target.value)
    // console.log(this.transformDate(event.target.value))
    this.tanggal = this.transformDate(event.target.value)
  }

  transformDate(datetime: any): any {
    if (datetime) {
      const date = new Date(datetime);
      return this.datepipe.transform(date, 'yyyy/MM/dd HH:mm');
    }
    return datetime;
  }
  penanganan;
  catatan;
  tanggal;
  ditangani;
  save() {
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('penanganan', this.penanganan);
    formData.append('ditangani', this.ditangani);
    formData.append('catatan', this.catatan);
    formData.append('tanggal', this.tanggal);
    formData.append('kejadianid', this.kejadianid);

    this.http.post("http://192.168.1.12/tasiuks/api/insertdetailkejadian.php", formData).subscribe(
      (data) => {
        if (data['status']) {
          this.toast(data['pesan'], 'success');
          this.router.navigate(['/homepetugas/detailberita/' + this.kejadianid])
        }
        else {
          this.toast(data['pesan'], 'danger');
        }
      });
  }

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 2000
    })
    toast.present();
  }
}
