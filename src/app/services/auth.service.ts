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
  emailUser: string;
  passUser: string;
  tokenUser: string;
  tokendevice: string;
  ortuIdDb: number;
  petugasIdDb: number;
  // ambil token per ortu buat chat petugas uks
  // tokenOrtuDb: string;
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
    return this.http.post("http://192.168.1.2/tasiuks/api/login.php", body);
  }
  //update uidfirebase ke db
  updateUid(email, token): Observable<any> {
    let body = new HttpParams();
    body = body.set('uid', token);
    body = body.set('email', email);
    body = body.set('role', this.roleUser);
    return this.http.post("http://192.168.1.2/tasiuks/api/updateloginuid.php", body);
  }
  //kirim chat ke db 
  sendChatDb(ortuid, petugasid, msg, pengirim): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    body = body.set('petugasid', petugasid);
    body = body.set('msg', msg);
    body = body.set('pengirim', pengirim)
    return this.http.post("http://192.168.1.2/tasiuks/api/insertchat.php", body);
  }
  //ambil petugas status aktif
  getPetugasAktif(): Observable<any> {
    return this.http.get("http://192.168.1.2/tasiuks/api/getPetugasAktif.php");
  }
  getPeriodeAktif(): Observable<any> {
    return this.http.get("http://192.168.1.2/tasiuks/api/getPeriodeAktif.php");

  }
  //PETUGAS SERVICE
  updateTokenDevicePetugas(token, id): Observable<any> {
    let body = new HttpParams();
    body = body.set('tokendevice', token);
    body = body.set('petugasid', id);
    return this.http.post("http://192.168.1.2/tasiuks/api/updatetokendevicepetugas.php", body);
  }
  getListChat(id): Observable<any> {
    let body = new HttpParams();
    body = body.set('petugasid', id);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlistchat.php", body);
  }

  getListContact(): Observable<any> {
    return this.http.get("http://192.168.1.2/tasiuks/api/getlistcontact.php");
  }

  getListKelas(): Observable<any> {
    return this.http.get("http://192.168.1.2/tasiuks/api/getlistkelas.php");
  }
  getListKelasPerizinan(id): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', id);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlistkelasperizinan.php", body);
  }
  listInformasiPetugas(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getinformasipetugas.php", body);
  }
  listDetailInfo(infoid): Observable<any> {
    let body = new HttpParams();
    body = body.set('infoid', infoid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailinfo.php", body);
  }
  listDetailPemeriksaan(id): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailpemeriksaan.php", body);
  }
  listDetailPetugas(petugasid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('petugasid', petugasid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailpetugas.php", body);
  }
  deleteInfo(infoid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('infoid', infoid);
    return this.http.post("http://192.168.1.2/tasiuks/api/deleteinformasi.php", body);
  }
  listKegiatan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanuks.php", body);
  }
  listJenis(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getjeniskegiatan.php", body);
  }
  listDetailKegiatan(kegiatanid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailkegiatan.php", body);
  }
  deleteKegiatan(kegiatanid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/deletekegiatan.php", body);
  }
  listSiswaAccPemeriksaan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getaccpemeriksaan.php", body);
  }
  listSiswaNotYetAccPemeriksaan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getaccyetpemeriksaan.php", body);
  }
  listSiswaAccKejadian(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getacckejadian.php", body);
  }
  listSiswaNotYetAccKejadian(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getaccyetkejadian.php", body);
  }
  getJumlahBelumAccPemeriksaan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahaccyetpemeriksaan.php", body);
  }
  getJumlahBelumAccPerizinan(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahaccyetperizinan.php", body);
  }
  listKegiatanPerizinanPetugas(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanperizinanpetugas.php", body);
  }
  listKelasKegiatanPerizinanPetugas(kegiatanid): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkelaskegiatanperizinan.php", body);
  }
  listSiswaAccKegiatan(kegiatanid): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getaccperizinan.php", body);
  }
  listSiswaDenyKegiatan(kegiatanid): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdenyperizinan.php", body);
  }
  listSiswaNotYetAccKegiatan(kegiatanid): Observable<any> {
    let body = new HttpParams();
    body = body.set('kegiatanid', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getaccyetperizinan.php", body);
  }
  getJumlahPesanPetugas(petugasid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('petugasid', petugasid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahpesanpetugas.php", body);
  }
  updatePesanTerbacaPetugas(petugasid: number, ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('petugasid', petugasid);
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/updatereadpesanpetugas.php", body);
  }
  detailKejadian(kejadianid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('kejadianid', kejadianid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailkejadian.php", body);
  }
  getLastKejadianSiswa(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlastkejadian.php", body);
  }
  getKegiatanTerdekat(): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', this.ortuIdDb);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanterdekat.php", body);
  }
  getKegiatanTerdekatPetugas(): Observable<any> {
    let body = new HttpParams();
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanterdekatpetugas.php", body);
  }
  listdevicekegiatan(forall: number, cb: any): Observable<any> {
    let body = new HttpParams();
    body = body.set('forall', forall);
    body = body.set('cbkelas', cb);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlistdevicekegiatan.php", body);
  }

  //ORTU SERVICE
  updateTokenDeviceOrtu(token, id): Observable<any> {
    let body = new HttpParams();
    body = body.set('tokendevice', token);
    body = body.set('ortuid', id);
    return this.http.post("http://192.168.1.2/tasiuks/api/updatetokendeviceortu.php", body);
  }
  //rekam medis
  listSiswa(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlistsiswa.php", body);
  }

  listRekamMedis(siswaid: number, periodeid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    body = body.set('periodeid', periodeid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getrekammedis.php", body);
  }

  listDetailSiswa(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailsiswa.php", body);
  }
  listPeriodeSiswa(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlistperiode.php", body);
  }
  updatePemeriksaan(idlaporan: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', idlaporan);
    return this.http.post("http://192.168.1.2/tasiuks/api/updateconfirmpemeriksaan.php", body);
  }
  listKejadian(siswaid: number, periodeid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    body = body.set('periodeid', periodeid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getlistkejadian.php", body)
  }
  updateKejadian(idlaporan: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', idlaporan);
    return this.http.post("http://192.168.1.2/tasiuks/api/updateconfirmkejadian.php", body);
  }

  listInformasiOrtu(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getinformasiortu.php", body);
  }

  listDetailOrtu(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getdetailortu.php", body);
  }
  getJumlahPerizinan(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahperizinanortu.php", body);
  }
  getJumlahPerizinanAll(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahperizinanortuall.php", body);
  }
  listKegiatanPerizinan(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanperizinanortu.php", body);
  }
  listKegiatanPerizinanAll(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanperizinanortuall.php", body);
  }
  detailKegiatanPerizinan(kegiatanid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', kegiatanid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanperizinanortuall.php", body);
  }
  updatePerizinanKegiatan(siswaid: number, kegiatanid: number, ortuid: number, kelasajaranid: number, periodeajaranid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    body = body.set('kegiatanid', kegiatanid);
    body = body.set('ortuid', ortuid);
    body = body.set('kelasajaranid', kelasajaranid);
    body = body.set('periodeajaranid', periodeajaranid);
    return this.http.post("http://192.168.1.2/tasiuks/api/updateperizinankegiatan.php", body);
  }
  getJumlahPemeriksaan(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahpemeriksaan.php", body);
  }
  getJumlahKejadian(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahkejadian.php", body);
  }
  getKegiatanOrtuAllAcc(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanortuallacc.php", body);
  }
  getKegiatanOrtuAllNot(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanortuallnot.php", body);
  }
  getKegiatanOrtuKelasAcc(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanortukelasacc.php", body);
  }
  getKegiatanOrtuKelasNot(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanortukelasnot.php", body);
  }
  getKegiatanOrtuNonPerizinan(siswaid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('siswaid', siswaid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getkegiatanortunonperizinan.php", body);
  }
  getJumlahPesanOrtu(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/getjumlahpesanortu.php", body);
  }
  updatePesanTerbacaOrtu(ortuid: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('ortuid', ortuid);
    return this.http.post("http://192.168.1.2/tasiuks/api/updatereadpesanortu.php", body);
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
          // this.tokendevice = await data.user.getIdToken();
          // console.log('lallal ' + this.tokendevice)
        } else {
          loading.dismiss();
          // this.toast('Harap verifikasi email anda!', 'warning');
          // this.afauth.signOut();
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
    this.setRole('');
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    // this.setOrtuId(0);

    this.afauth.signOut()
      .then(() => {
        this.setRole('');
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

  updateProfilFirebasePetugas(token, newusername, newphone) {
    return this.afs.collection('user').doc(token).update({
      "userName": newusername,
      "userPhone": newphone
    })
  }
  updateProfilFirebaseOrtu(token, newusername, newphone) {
    return this.afs.collection('user').doc(token).update({
      "userName": newusername,
      "userPhone": newphone
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
  setEmail(email: string) {
    this.storage.ready().then(() => {
      this.storage.set('email', email);
      console.log('set Email', email);
    });
  }
  email(email: string) {
    this.emailUser = email;
  }
  getEmail() {
    return this.storage.get('email');
  }
  setPassword(pass: string) {
    this.storage.ready().then(() => {
      this.storage.set('password', pass);
      console.log('set Password', pass);
    });
  }
  password(pass: string) {
    this.passUser = pass;
  }
  getPassword() {
    return this.storage.get('password');
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
          // if (m.from === this.tokenUser || m.to === this.tokenUser) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.tokenUser === m.from;
          m.msgForMe = this.tokenUser === m.to;
          // m.toOrtu = m.to == this.tokenOrtuDb;
          // m.fromOrtu = m.from == this.tokenOrtuDb;
          // this.index = this.index + 1
          // this.mess = Array.from(messages)
          // m.muncul = true;
          // this.mess.push.apply('a', [m.from, m.to, m.msg, m.createdAt]);
          // console.log('mess' + this.mess.toString());
          // }
          // else {
          // messages.splice(this.index, 1);
          // this.index = this.index + 1
          // }

        }
        console.log('all messages : ', messages);
        return messages;
      })
    )
  }//end get messages


}


