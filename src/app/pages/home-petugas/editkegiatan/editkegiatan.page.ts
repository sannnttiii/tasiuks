import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editkegiatan',
  templateUrl: './editkegiatan.page.html',
  styleUrls: ['./editkegiatan.page.scss'],
})
export class EditkegiatanPage implements OnInit {

  constructor(public alertController: AlertController, public datepipe: DatePipe, private as: AuthService, private route: ActivatedRoute, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.listJenis();
    this.listDetailKegiatan(this.kegiatanid);
  }
  petugasid = this.as.petugasIdDb;
  kegiatanid = this.route.snapshot.params['kegiatanid'];
  nama = ''
  pelaksana = ''
  tanggal;
  jk;
  selesai;
  jenisid = 0;

  jenis = []
  listJenis() {
    this.as.listJenis().subscribe(
      (data) => {
        this.jenis = data['pesan'];
      }
    )
  }
  listDetailKegiatan(kegiatanid) {
    this.as.listDetailKegiatan(kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.nama = data['pesan'][0]['nama'];
          this.tanggal = data['pesan'][0]['tanggal'];
          this.pelaksana = data['pesan'][0]['pelaksana'];
          this.jk = data['pesan'][0]['jenisid']
          this.selesai = data['pesan'][0]['selesai']
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
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
      formData.append('petugasid', this.petugasid.toString());
      formData.append('kegiatanid', this.kegiatanid)

      this.http.post("http://192.168.1.12/tasiuks/api/updatekegiatan.php", formData).subscribe(
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


  async delete() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi!',
      message: 'Apakah anda yakin ingin menghapus kegiatan UKS ini ?',
      buttons: [{
        text: "Batal",
        role: "cancel"
      }, {
        text: 'Yakin',
        handler: () => {
          this.as.deleteKegiatan(this.kegiatanid).subscribe(
            async (data) => {
              if (data['status']) {
                this.toast(data['pesan'], 'success')
                this.router.navigate(['/homepetugas/confirmperizinanpetugas'])

              }
              else {
                this.toast(data['pesan'], 'danger')
              }
            }
          )
        }
      }]
    });
    await alert.present();
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
