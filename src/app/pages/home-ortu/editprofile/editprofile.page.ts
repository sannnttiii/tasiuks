import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(private as: AuthService, public loadingController: LoadingController, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ortuid = this.as.ortuIdDb
  ortu = []
  namaAyah = ''
  namaIbu = ''
  alamatAyah = ''
  telpAyah = ''
  telpIbu = ''
  token = ''
  ngOnInit() {
    this.listDetailOrtu(this.ortuid)
  }
  save() {
    const formData = new FormData();
    formData.append('namaayah', this.namaAyah);
    formData.append('namaibu', this.namaIbu);
    formData.append('alamatayah', this.alamatAyah);
    formData.append('nohpibu', this.telpIbu);
    formData.append('nohpayah', this.telpAyah);
    formData.append('id', this.ortuid.toString());


    this.http.post("http://192.168.1.2/tasiuks/api/updateprofileortu.php", formData).subscribe((response: any) => {
      if (response['status']) {
        this.as.updateProfilFirebaseOrtu(this.token, this.namaIbu, this.telpIbu)
        this.toast(response['pesan'], 'success');
        this.router.navigate(['/homeortu/profile'])
      }
      else {
        this.toast(response['pesan'], 'danger');
      }
    });
  }

  listDetailOrtu(ortuid) {
    this.as.listDetailOrtu(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.ortu = data['pesan']
          this.namaAyah = data['pesan'][0]['namaayah'];
          this.namaIbu = data['pesan'][0]['namaibu'];
          this.alamatAyah = data['pesan'][0]['alamat'];
          this.telpAyah = data['pesan'][0]['noayah'];
          this.telpIbu = data['pesan'][0]['noibu'];
          this.token = data['pesan'][0]['token'];
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
