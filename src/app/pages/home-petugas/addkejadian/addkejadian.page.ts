import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addkejadian',
  templateUrl: './addkejadian.page.html',
  styleUrls: ['./addkejadian.page.scss'],
})
export class AddkejadianPage implements OnInit {

  constructor(public datepipe: DatePipe, private router: Router, private route: ActivatedRoute, private as: AuthService, private toastr: ToastController, private http: HttpClient,) { }

  ngOnInit() {
  }
  siswaid = this.route.snapshot.params['idsiswa'];
  tanggal;
  kejadian = ''
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
  save() {
    if (this.kejadian && this.tanggal) {
      const formData = new FormData();
      formData.append('kejadian', this.kejadian);
      formData.append('tanggal', this.tanggal);
      formData.append('siswaid', this.siswaid);

      this.http.post("http://192.168.1.12/tasiuks/api/insertkejadian.php", formData).subscribe(
        (data) => {
          if (data['status']) {
            this.toast(data['pesan'], 'success');
            this.router.navigate(['/homepetugas/detailkejadian/' + this.siswaid])
          }
          else {
            this.toast(data['pesan'], 'danger');
          }
        });
    }
    else {
      this.toast('Harap isi form dengan lengkap', 'warning');
    }
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
