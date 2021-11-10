import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addpemeriksaan',
  templateUrl: './addpemeriksaan.page.html',
  styleUrls: ['./addpemeriksaan.page.scss'],
})
export class AddpemeriksaanPage implements OnInit {

  constructor(private as: AuthService, private toastr: ToastController, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.listKegiatan();
  }
  kegiatan = []
  listKegiatan() {
    this.as.listKegiatan().subscribe(
      (data) => {
        this.kegiatan = data['pesan'];
      }
    )
  }
  tinggi;
  berat;
  hasil;
  catatan;
  kg = '';
  kegiatanid = 0
  siswaid = this.route.snapshot.params['idsiswa'];
  onChange(event) {
    // console.log(event.target.value)
    this.kegiatanid = event.target.value;
  }
  save() {
    if (this.tinggi && this.berat && this.hasil && this.catatan && this.kegiatanid) {
      const formData = new FormData();
      formData.append('tinggi', this.tinggi);
      formData.append('berat', this.berat);
      formData.append('hasil', this.hasil);
      formData.append('catatan', this.catatan);
      formData.append('kegiatanid', this.kegiatanid.toString());
      formData.append('siswaid', this.siswaid);

      this.http.post("http://192.168.1.12/tasiuks/api/insertpemeriksaan.php", formData).subscribe(
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
