import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  private team;
  private url = "";
  private cachedLogos = [];
  

  constructor(private navParams: NavParams, private modalController: ModalController, public localStorage: Storage) {
    this.team = navParams.get('team');
    this.localStorage.get(this.team.team).then(val => {
      this.url = val;
    });
    for(let team of this.team.matches) {
      this.localStorage.get(team.opponent).then(val => {
        this.cachedLogos[team.opponent] = val;
      })
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
