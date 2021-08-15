import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes,RouterModule} from '@angular/router';
import { RouteReuseStrategy} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { HttpClientModule } from '@angular/common/http';

const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
];

@NgModule({
  declarations: [AppComponent, 
    LoginComponent],
  entryComponents: [],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes),
  AngularFireModule.initializeApp(environment.firebaseConfig), 
  IonicStorageModule.forRoot(), 
  FormsModule,
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireDatabaseModule, AngularFireStorageModule,
  
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
