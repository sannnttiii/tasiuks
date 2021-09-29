import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.page.html',
  styleUrls: ['./editinfo.page.scss'],
})
export class EditinfoPage implements OnInit {

  constructor(private as: AuthService, private route: ActivatedRoute, private toastr: ToastController, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.listDetailInfo(this.infoid);
  }
  judul = ''
  keterangan = ''
  infoid = this.route.snapshot.params['infoid'];
  listDetailInfo(infoid) {
    this.as.listDetailInfo(infoid).subscribe(
      (data) => {
        if (data['status']) {
          this.judul = data['pesan'][0]['judul'];
          this.keterangan = data['pesan'][0]['keterangan'];
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }


  file: File;
  changeListener($event): void {
    this.file = $event.target.files[0];
  }

  save() {
    if (this.file && this.judul && this.keterangan) {
      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('judul', this.judul);
      formData.append('keterangan', this.keterangan);
      formData.append('infoid', this.infoid);

      this.http.post("http://localhost/tasiuks/api/updateinformasi.php", formData).subscribe(
        (data) => {
          console.log(this.file, this.judul, this.keterangan, this.infoid);
          if (data['status']) {
            this.toast(data['pesan'], 'success');
            this.router.navigate(['/homepetugas/information'])
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
  delete() {
    this.as.deleteInfo(this.infoid).subscribe(
      (data) => {
        if (data['status']) {
          this.toast(data['pesan'], 'success')
          this.router.navigate(['/homepetugas/information'])

        }
        else {
          this.toast(data['pesan'], 'danger')
        }
      }
    )
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
