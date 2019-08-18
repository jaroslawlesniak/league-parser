import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  private team;
  private url;

  constructor(private navParams: NavParams, private modalController: ModalController, private http: HttpClient) {
    this.team = navParams.get('team');
    this.http.get('https://api.jaroslawlesniak.pl/league-parser/load-icon.php?url=' + this.team.url).subscribe(data => {
      this.url = data.image;
      console.log(data);
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
