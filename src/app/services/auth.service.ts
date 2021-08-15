import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User;
  roleLogin:any;
  roleUser:string;
  tokenUser:string;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private http:HttpClient,
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

  signindb(email,password):Observable<any>
  {
    let body = new HttpParams();
    body = body.set('email',email);
    body = body.set('password',password);
    return this.http.post("http://localhost/tasiuks/api/login.php",body);
  }
  
  updateUid(email):Observable<any>
  {
    let body = new HttpParams();
    body = body.set('uid',this.tokenUser);
    body = body.set('email', email);
    body = body.set('role',this.roleUser);
    return this.http.post("http://localhost/tasiuks/api/updateloginuid.php",body);
  }

  setRole(role:string){
    this.storage.ready().then(() => {
      this.storage.set('role', role);
      console.log('set Role ' , role);
    });
  }
  role(role:string)
  {
    this.roleUser=role;
  }
  getRole(){
    return this.storage.get('role');
  }

  async signIn(email, password) {
    const loading = await this.loadingCtrl.create({
      message : 'Authenticating..',
      spinner:'crescent',
      showBackdrop:true
    });
    loading.present();
    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=>{
      this.afauth.signInWithEmailAndPassword(email,password).then(async (data)=>{
        if(!data.user.emailVerified)
        {
          loading.dismiss();
          this.toast('Harap verifikasi email anda!','warning');
          this.afauth.signOut();
        }else{
          console.log(this.roleUser)
          loading.dismiss();
          this.tokenUser= await  data.user.uid;
          console.log('token : ' + this.tokenUser);
          if(this.roleUser=='petugas')
          {
          this.router.navigate(['/homepetugas/dashboard']);
          }
          else if(this.roleUser=='ortu'){
            this.router.navigate(['/homeortu/dashboard']);
          }
          else{
            console.log(this.roleLogin)
          }
        }
      })
      .catch(error=>{
        loading.dismiss();
        this.toast(error.message,'danger');
      })
    })
    .catch(error=>{
      loading.dismiss();
      this.toast(error.message,'danger');
    });
  }//end sign in

  async signOut()
  {
    const loading = await this.loadingCtrl.create({
      spinner:'crescent',
      showBackdrop:true
    });
    loading.present();

    this.afauth.signOut()
    .then(()=>{
      loading.dismiss();
      this.router.navigate(['/login']);
    })
  }//end signout

  async toast(msg, status)
  {
    const toast = await this.toastr.create({
      message:msg,
      color: status,
      position : 'bottom',
      duration:2000
    });
    toast.present();
  }
}


