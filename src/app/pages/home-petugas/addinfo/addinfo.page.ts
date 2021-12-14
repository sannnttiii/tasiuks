import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.page.html',
  styleUrls: ['./addinfo.page.scss'],
})
export class AddinfoPage implements OnInit {

  constructor(
    private as: AuthService, private toastr: ToastController, private http: HttpClient, private router: Router
  ) { }

  ngOnInit() {
    this.listKelas();
  }
  petugasid = this.as.petugasIdDb;
  judul = ''
  keterangan = ''
  semua = true;
  forall = 1;
  kelas = []
  listKelas() {
    this.as.getListKelas().subscribe(
      (data) => {
        this.kelas = data;
      }
    )
  }

  finalChecked = []
  addArray(kelasChecked: String) {
    if (!this.finalChecked.includes(kelasChecked)) {
      // alert("Tambah " + kelasChecked);
      this.finalChecked.push(kelasChecked);
    }
    else if (this.finalChecked.includes(kelasChecked)) {
      // alert("Hapus " + kelasChecked);
      let index = this.removeFromFinal(kelasChecked);
      this.finalChecked.splice(index, 1);
    }
  }

  removeFromFinal(kelasChecked: String) {
    return this.finalChecked.findIndex((category) => {
      return category === kelasChecked;
    });
  }
  checkCheckbox() {
    var g: string = '';
    this.finalChecked.forEach(element => {
      g += element + ", ";
    });
    alert(this.finalChecked.toString());
  }

  viewKelasTrue() {
    this.semua = false;
    this.forall = 0
  }
  viewKelasFalse() {
    this.semua = true;
    this.forall = 1
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
      formData.append('petugasid', this.petugasid.toString());
      formData.append('forall', this.forall.toString());
      formData.append('cbkelas', this.finalChecked.toString());

      this.http.post("http://192.168.1.6/tasiuks/api/insertinformasi.php", formData).subscribe(
        (data) => {
          console.log(this.file, this.judul, this.keterangan, this.petugasid, this.forall, this.finalChecked);
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
  godrive(url) {
    //jika ada http langsung kalau gaada yauda tambahin
    if (url.substring(0, 7) == "http://" || url.substring(0, 8) == "https://") {
      window.open(url, "_system", "location=yes");
    } else {
      window.open("http://" + url, "_system", "location=yes");
    }
  }
  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 3000
    })
    toast.present();
  }
}
