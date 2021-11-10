import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addkegiatan',
  templateUrl: './addkegiatan.page.html',
  styleUrls: ['./addkegiatan.page.scss'],
})
export class AddkegiatanPage implements OnInit {

  constructor(private as: AuthService,
    public datepipe: DatePipe, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.listKelas();
    this.listJenis();
  }
  petugasid = this.as.petugasIdDb;
  nama = ''
  pelaksana = ''
  tanggal;
  semua = true;
  forall = 1;
  kelas = []
  jk = '';
  jenisid = 0;
  listKelas() {
    this.as.getListKelas().subscribe(
      (data) => {
        this.kelas = data;
      }
    )
  }

  jenis = []
  listJenis() {
    this.as.listJenis().subscribe(
      (data) => {
        this.jenis = data['pesan'];
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

  view = false;
  perizinan = 0;
  viewPerizinanTrue() {
    this.view = true;
    this.perizinan = 1;
  }
  viewPerizinanFalse() {
    this.view = false;
    this.perizinan = 0;
  }

  onChange(event) {
    // console.log(event.target.value)
    this.jenisid = event.target.value;
  }

  onChangeDate(event) {
    // console.log(event.target.value)
    // console.log(this.transformDate(event.target.value))
    this.tanggal = this.transformDate(event.target.value)
  }

  transformDate(datetime: any): any {
    if (datetime) {
      const date = new Date(datetime);
      return this.datepipe.transform(date, 'yyyy/MM/dd');
    }
    return datetime;
  }

  save() {
    if (this.nama && this.tanggal && this.pelaksana && this.jenisid) {
      const formData = new FormData();
      formData.append('nama', this.nama);
      formData.append('jenisid', this.jenisid.toString());
      formData.append('pelaksana', this.pelaksana);
      formData.append('tanggal', this.tanggal);
      formData.append('perizinan', this.perizinan.toString());
      formData.append('petugasid', this.petugasid.toString());
      formData.append('forall', this.forall.toString());
      formData.append('cbkelas', this.finalChecked.toString());

      this.http.post("http://192.168.1.12/tasiuks/api/insertkegiatan.php", formData).subscribe(
        (data) => {
          if (data['status']) {
            this.toast(data['pesan'], 'success');
            this.router.navigate(['/homepetugas/confirmperizinanpetugas'])
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
