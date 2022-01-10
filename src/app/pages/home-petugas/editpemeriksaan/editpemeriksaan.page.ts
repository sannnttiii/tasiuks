import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editpemeriksaan',
  templateUrl: './editpemeriksaan.page.html',
  styleUrls: ['./editpemeriksaan.page.scss'],
})
export class EditpemeriksaanPage implements OnInit {

  constructor(private as: AuthService, private route: ActivatedRoute, public alertController: AlertController, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.listKegiatan();
    this.listDetailPemeriksaan(this.pemeriksaanid);
  }
  tinggi;
  berat;
  hasil = '';
  catatan = '';
  kg = '';
  kegiatanid = 0
  pemeriksaanid = this.route.snapshot.params['idpemeriksaan']
  siswaid = this.route.snapshot.params['idsiswa']

  onChange(event) {
    // console.log(event.target.value)
    this.kegiatanid = event.target.value;
  }
  kegiatan = []
  listKegiatan() {
    this.as.listKegiatan().subscribe(
      (data) => {
        this.kegiatan = data['pesan'];
      }
    )
  }
  listDetailPemeriksaan(id) {
    this.as.listDetailPemeriksaan(id).subscribe(
      (data) => {
        if (data['status']) {
          this.kg = data['pesan'][0]['idkegiatan'];
          this.tinggi = data['pesan'][0]['tinggi'];
          this.berat = data['pesan'][0]['berat'];
          this.hasil = data['pesan'][0]['hasil'];
          this.catatan = data['pesan'][0]['catatan']
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }

  save() {
    if (this.tinggi && this.berat && this.kegiatanid) {
      const formData = new FormData();
      formData.append('tinggi', this.tinggi);
      formData.append('berat', this.berat);
      formData.append('kegiatanid', this.kegiatanid.toString());
      formData.append('id', this.pemeriksaanid.toString());

      if (this.catatan != '') {
        formData.append('catatan', this.catatan);
      }
      if (this.hasil != '') {
        formData.append('hasil', this.hasil);
      }
      this.http.post("http://192.168.1.10/tasiuks/api/updatepemeriksaan.php", formData).subscribe(
        (data) => {
          if (data['status']) {
            this.toast(data['pesan'], 'success');
            this.router.navigate(['/homepetugas/detailpemeriksaan/' + this.siswaid])
          }
          else {
            this.toast(data['pesan'], 'danger');
          }
        });
    }


  }
  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 5000
    })
    toast.present();
  }
}
