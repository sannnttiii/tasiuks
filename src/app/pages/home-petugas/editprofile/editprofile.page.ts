import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(private as: AuthService, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.listDetailPetugas(this.petugasid)
  }

  nama = ''
  alamat = ''
  telp = ''
  petugasid = this.as.petugasIdDb;
  save() {
    const formData = new FormData();
    formData.append('nama', this.nama);
    formData.append('alamat', this.alamat);
    formData.append('telp', this.telp);
    formData.append('petugasid', this.petugasid.toString());


    this.http.post("http://192.168.1.7/tasiuks/api/updateprofilepetugas.php", formData).subscribe((response: any) => {
      if (response['status']) {
        this.toast(response['pesan'], 'success');
        this.router.navigate(['/homepetugas/profile'])
      }
      else {
        this.toast(response['pesan'], 'danger');
      }
    });
  }

  petugas = []
  listDetailPetugas(petugasid) {
    this.as.listDetailPetugas(petugasid).subscribe(
      (data) => {
        if (data['status']) {
          this.petugas = data['pesan']
          this.nama = data['pesan'][0]['nama'];
          this.alamat = data['pesan'][0]['alamat'];
          this.telp = data['pesan'][0]['telp'];
        }
        else {
          console.log(data['pesan'])
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
