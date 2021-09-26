import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-formconfirm',
  templateUrl: './formconfirm.page.html',
  styleUrls: ['./formconfirm.page.scss'],
})
export class FormconfirmPage implements OnInit {
  acc = 'ya'
  diizinkan = false;
  alasan = '';

  constructor(private fb: FormBuilder,
    private as: AuthService,
    public loadingController: LoadingController, public route: ActivatedRoute,
    private toastr: ToastController, private http: HttpClient, private router: Router,) {

  }

  ngOnInit() {
    this.listSiswa(this.ortuid);

  }

  siswas = []
  siswaid = 0;
  ortuid = this.as.ortuIdDb;
  kegiatanid = this.route.snapshot.params['idkegiatan'];
  listSiswa(ortuid) {
    this.as.listSiswa(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswas = data['pesan'];
          this.siswaid = data['pesan'][0]['idsiswa'];
          this.detailSiswa(this.siswaid);

        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }

  kelasid = 0;
  periodid = 0;
  siswanama = ''
  detailSiswa(siswaid) {
    this.as.listDetailSiswa(siswaid).subscribe(
      (data) => {
        if (data['status']) {
          this.kelasid = data['pesan'][0]['kelasid'];
          this.periodid = data['pesan'][0]['periodeid'];
          this.siswanama = data['pesan'][0]['nama'];
          console.log('id siswa' + this.siswaid + this.kelasid + this.periodid + this.kegiatanid + this.ortuid);

        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }

  viewAlasanTrue() {
    this.diizinkan = true;
    this.acc = "tidak"
  }
  viewAlasanFalse() {
    this.diizinkan = false;
    this.acc = "ya"
  }
  file: File;
  changeListener($event): void {
    this.file = $event.target.files[0];
  }
  save() {
    if (this.acc == 'ya') {
      this.as.updatePerizinanKegiatan(this.siswaid, this.kegiatanid, this.ortuid, this.kelasid, this.periodid).subscribe(
        (data) => {
          if (data['status']) {
            this.toast(data['pesan'], 'success');
            this.router.navigate(['/homeortu/dashboard'])
          }
          else {
            this.toast(data['pesan'], 'danger');
          }
        });
    }
    else if (this.acc = 'tidak') {
      if (this.file && this.alasan) {
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('alasan', this.alasan);
        formData.append('siswaid', this.siswaid.toString());
        formData.append('ortuid', this.ortuid.toString());
        formData.append('kegiatanid', this.kegiatanid.toString());
        formData.append('kelasajaranid', this.kelasid.toString());
        formData.append('periodeajaranid', this.periodid.toString());

        this.http.post("http://localhost/tasiuks/api/updateperizinanortu.php", formData).subscribe(
          (data) => {
            console.log(this.alasan, this.file);
            if (data['status']) {
              this.toast(data['pesan'], 'success');
              this.router.navigate(['/homeortu/dashboard'])
            }
            else {
              this.toast(data['pesan'], 'danger');
            }
          });
      }
      else {
        this.toast('Harap isi alasan dan bukti', 'warning');
      }

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
