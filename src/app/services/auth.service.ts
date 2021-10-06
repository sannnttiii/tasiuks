import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';

export interface Message {
  createdAt: firebase.default.firestore.Timestamp;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
  msgForMe: boolean;
  to: string;
  //untuk chat perortu
  fromOrtu: boolean;
  toOrtu: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User = null;
  roleUser: string;
  tokenUser: string;
  ortuIdDb: number;
  petugasIdDb: number;
  // ambil token per ortu buat chat petugas uks
  tokenOrtuDb: string;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.user$ = this.afauth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>('user/${user.uid}').valueChanges();
          }
          else {
            return null;
          }
        })
      )
  }

  signindb(email, password): Observable<any> {
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    return this.http.post("http://localhost/tasiuks/api/login.php", body);
  }
  //update uidfirebase ke db
  updateUid(email, token): Observable<any> {
    let body = new HttpParams();
    body = body.set('uid', token);
    body = body.set('email', email);
    body = body.set('role', this.roleUser);
    return this.http.post("http://localhost/tasiuks/api/updateloginuid.php", body);
  }
  //kirim chat ke db 
  sendChatDb(ortuid, petugasid, msg, pengirim): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    body = body.set('petugasid', petugasid);
    body = body.set('msg', msg);
    body = body.set('pengirim', pengirim)
    return this.http.post("http://localhost/tasiuks/api/insertchat.php", body);
  }
  //ambil petugas status aktif
  getPetugasAktif(): Observable<any> {
    return this.http.get("http://localhost/tasiuks/api/getPetugasAktif.php");
  }

  //PETUGAS SERVICE
  getListChat(): Observable<any> {
    return this.http.get("http://localhost/tasiuks/api/getlistchat.php");
  }

  getListContact(): Observable<any> {
    return this.http.get("http://localhost/tasiuks/api/getlistcontact.php");
  }

  getListKelas(): Observable<any> {
    return this.http.get("http://localhost/tasiuks/api/getlistkelas.php");
  }
  listInformasiPetugas(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://localhost/tasiuks/api/getinformasipetugas.php", body);
  }
  listDetailInfo(infoid): Observable<any> {
    let body = new HttpParams();
    body = body.set('infoid', infoid);
    return this.http.post("http://localhost/tasiuks/api/getdetailinfo.php", body);
  }
  listDetailPetugas(petugasid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('petugasid', petugasid);
    return this.http.post("http://localhost/tasiuks/api/getdetailpetugas.php", body);
  }
  deleteInfo(infoid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('infoid', infoid);
    return this.http.post("http://localhost/tasiuks/api/deleteinformasi.php", body);
  }
  listKegiatan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://localhost/tasiuks/api/getkegiatanuks.php", body);
  }
  listJenis(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://localhost/tasiuks/api/getjeniskegiatan.php", body);
  }
  listDetailKegiatan(kegiatanid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', kegiatanid);
    return this.http.post("http://localhost/tasiuks/api/getdetailkegiatan.php", body);
  }
  deleteKegiatan(kegiatanid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', kegiatanid);
    return this.http.post("http://localhost/tasiuks/api/deletekegiatan.php", body);
  }
  listSiswaAccPemeriksaan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://localhost/tasiuks/api/getaccpemeriksaan.php", body);
  }



  //ORTU SERVICE
  //rekam medis
  listSiswa(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getlistsiswa.php", body);
  }

  listRekamMedis(siswaid: number, periodeid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    body = body.set('periodeid', periodeid);
    return this.http.post("http://localhost/tasiuks/api/getrekammedis.php", body);
  }

  listDetailSiswa(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://localhost/tasiuks/api/getdetailsiswa.php", body);
  }
  listPeriodeSiswa(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://localhost/tasiuks/api/getlistperiode.php", body);
  }
  updatePemeriksaan(idlaporan: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', idlaporan);
    return this.http.post("http://localhost/tasiuks/api/updateconfirmpemeriksaan.php", body);
  }
  listKejadian(siswaid: number, periodeid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    body = body.set('periodeid', periodeid);
    return this.http.post("http://localhost/tasiuks/api/getlistkejadian.php", body)
  }
  updateKejadian(idlaporan: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', idlaporan);
    return this.http.post("http://localhost/tasiuks/api/updateconfirmkejadian.php", body);
  }

  listInformasiOrtu(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getinformasiortu.php", body);
  }

  listDetailOrtu(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getdetailortu.php", body);
  }
  getJumlahPerizinan(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getjumlahperizinanortu.php", body);
  }
  getJumlahPerizinanAll(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getjumlahperizinanortuall.php", body);
  }
  listKegiatanPerizinan(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getkegiatanperizinanortu.php", body);
  }
  listKegiatanPerizinanAll(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getkegiatanperizinanortuall.php", body);
  }
  detailKegiatanPerizinan(kegiatanid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', kegiatanid);
    return this.http.post("http://localhost/tasiuks/api/getkegiatanperizinanortuall.php", body);
  }
  updatePerizinanKegiatan(siswaid: number, kegiatanid: number, ortuid: number, kelasajaranid: number, periodeajaranid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    body = body.set('kegiatanid', kegiatanid);
    body = body.set('ortuid', ortuid);
    body = body.set('kelasajaranid', kelasajaranid);
    body = body.set('periodeajaranid', periodeajaranid);
    return this.http.post("http://localhost/tasiuks/api/updateperizinankegiatan.php", body);
  }
  getJumlahPemeriksaan(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getjumlahpemeriksaan.php", body);
  }
  getJumlahKejadian(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://localhost/tasiuks/api/getjumlahkejadian.php", body);
  }


  async signIn(email, password) {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
      this.afauth.signInWithEmailAndPassword(email, password).then(async (data) => {
        if (data.user.emailVerified) {
          //ini uid
          this.tokenUser = await data.user.uid;
          console.log('token : ' + this.tokenUser);
          loading.dismiss();
          //ini token 
          // this.tokentes = await data.user.getIdToken();
          // console.log('lallal ' + this.tokentes)
        } else {
          loading.dismiss();
          this.toast('Harap verifikasi email anda!', 'warning');
          this.afauth.signOut();
        }
      })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        })
    })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
  }//end sign in

  async signOut() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.setRole('');
    // this.setOrtuId(0);

    this.afauth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
        this.toast('Berhasil Keluar Aplikasi', 'success')
        loading.dismiss();
      })

  }//end signout

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  addChatMessage(msg, kirimkeuid) {
    return this.afs.collection('messages').add({
      msg,
      from: this.tokenUser,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
      to: kirimkeuid
    })
  }

  getUsers() {
    return this.afs.collection('user').valueChanges({ idField: 'userToken' }) as unknown as Observable<User[]>;
  }

  getUserForMsg(msgFromId, users: User[]): string {
    for (let usr of users) {
      if (usr.userToken == msgFromId) {
        return usr.userName;
      }
    }
    return 'Deleted';
  }

  setRole(role: string) {
    this.storage.ready().then(() => {
      this.storage.set('role', role);
      console.log('set Role ', role);
    });
  }
  role(role: string) {
    this.roleUser = role;
  }
  getRole() {
    return this.storage.get('role');
  }
  setOrtuId(ortuid: number) {
    this.storage.ready().then(() => {
      this.storage.set('ortuid', ortuid);
      console.log('set Ortu id ', ortuid);
    });
  }
  ortuId(ortuid: number) {
    this.ortuIdDb = ortuid;
  }
  getOrtuId() {
    return this.storage.get('ortuid');
  }
  setPetugasId(petugasid: number) {
    this.storage.ready().then(() => {
      this.storage.set('petugasid', petugasid);
      console.log('set petugas id ', petugasid);
    });
  }
  petugasId(petugasid: number) {
    this.petugasIdDb = petugasid;
  }
  getPetugasId() {
    return this.storage.get('petugasid');
  }


  mess = []
  index = 0
  getChatMessages() {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users:', users)
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'userToken' }) as unknown as Observable<Message[]>
      }),
      map(messages => {
        for (let m of messages) {
          //munculin chat dia sbagai pengirim dan dia sebagai penerima
          if (m.from === this.tokenUser || m.to === this.tokenUser) {
            m.fromName = this.getUserForMsg(m.from, users);
            m.myMsg = this.tokenUser === m.from;
            m.msgForMe = this.tokenUser === m.to;
            m.toOrtu = m.to == this.tokenOrtuDb;
            m.fromOrtu = m.from == this.tokenOrtuDb;
            this.index = this.index + 1
            // this.mess = Array.from(messages)
            // m.muncul = true;
            // this.mess.push.apply('a', [m.from, m.to, m.msg, m.createdAt]);
            // console.log('mess' + this.mess.toString());
          }
          else {
            messages.splice(this.index, 1);
            this.index = this.index + 1
          }

        }
        console.log('all messages : ', messages);
        return messages;
      })
    )
  }//end get messages


}


