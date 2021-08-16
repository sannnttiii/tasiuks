import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-formconfirm',
  templateUrl: './formconfirm.page.html',
  styleUrls: ['./formconfirm.page.scss'],
})
export class FormconfirmPage implements OnInit {
  acc = 'ya'
  siswa = '1'
  diizinkan = false;
  alasan = '';

  constructor(private fb: FormBuilder, public loadingController: LoadingController, private toastr: ToastController, private http: HttpClient, private router: Router,) {

  }

  ngOnInit() {
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
      console.log('ya')
      this.router.navigate(['/homeortu/confirmperizinanortu'])
    }
    else if (this.file && this.alasan) {
      const formData = new FormData();
      formData.append('image', this.file);
      this.http.post("http://localhost/tasiuks/api/perizinanortu.php", formData).subscribe((response: any) => {
        console.log(response);
        if (response['status']) {
          this.toast(response['pesan'], 'success');
          this.router.navigate(['/homeortu/confirmperizinanortu'])
        }
        else {
          this.toast(response['pesan'], 'danger');
        }
      });

    } else {
      this.toast('Harap isi alasan dan bukti', 'warning');
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
