import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailberita',
  templateUrl: './detailberita.page.html',
  styleUrls: ['./detailberita.page.scss'],
})
export class DetailberitaPage implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router, private as: AuthService, private toastr: ToastController) { }

  kejadianid = this.route.snapshot.params['idkejadian']
  ngOnInit() {
    this.listDetailKejadian(this.kejadianid);
  }
  details = []
  done = 0
  listDetailKejadian(kejadianid) {
    this.as.detailKejadian(kejadianid).subscribe(
      (data) => {
        if (data['status']) {
          this.details = data['pesan'];
          this.done = 1
        }
        else {
          console.log(data['pesan']);
          this.done = 2
        }
      }
    )
  }

}
