import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email='';
  password='';
  // showPassword = false;
  constructor(
    private as:AuthService,
    private toastr:ToastController,
    private storage: Storage,
    private router:Router,
  ) { }
  
  login()
  {
    if(this.email && this.password)
    {
      this.as.signindb(this.email,this.password).subscribe(
        (data)=>{
          if(data['result']=='OK'){
            this.as.setRole(data['role']);
            this.as.role(data['role']);
            this.storage.ready().then(()=>{
              //updateuid user token
                this.as.updateUid(this.email).subscribe((data)=>{
                    console.log(data['pesan']);
                });
                //signin firebase
                this.as.signIn(this.email,this.password);
            })
          }
          else{
            this.toast('Gagal!Email dan password tidak sesuai.','danger')
          }
        }
      )
     
    }
    else{
      this.toast('Harap isi email dan password','warning');
    }
  }

  async toast(msg,status)
  {
    const toast = await this.toastr.create({
      message:msg,
      color:status,
      position:'bottom',
      duration:2000
    })
    toast.present();
  }
  toggleShow() {
    // this.showPassword = !this.showPassword;
  }
  ngOnInit() {}

}
