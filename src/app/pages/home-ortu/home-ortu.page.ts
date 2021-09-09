import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-ortu',
  templateUrl: './home-ortu.page.html',
  styleUrls: ['./home-ortu.page.scss'],
})
export class HomeOrtuPage implements OnInit {

  constructor(private as: AuthService,
    private router: Router,) { }

  ngOnInit() {

  }

}
