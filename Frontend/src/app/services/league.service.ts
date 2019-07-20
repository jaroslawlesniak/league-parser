import { Injectable } from '@angular/core';
import { League } from 'src/modules/league';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private league: League = new League("", "");
  private data;
  private loadingSpinner;

  constructor(public loadingCtrl: LoadingController) {

   }

  getLeague(): League {
    return this.league;
  }

  setLeague(league: League) {
    this.league.name = league.name;
    this.league.path = league.path;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  async displayLoadingSpinner(msg: string = "Wczytywanie ...") {
    this.loadingSpinner = await this.loadingCtrl.create({
      message: msg
    });
  
    await this.loadingSpinner.present();
  }

  hideLoadingSpinner() {
    this.loadingSpinner.dismiss();
  }
}
