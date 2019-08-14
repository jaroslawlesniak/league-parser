import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  private team;

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.team = navParams.get('team');
    console.log(this.team);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
