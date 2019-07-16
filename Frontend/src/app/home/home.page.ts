import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { League } from '../../modules/league';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LeagueService } from '../services/league.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private storage: Storage;
  leagues: League[];
  data2: League;

  constructor(public localStorage: Storage, private alertCtrl: AlertController, private router: Router, private leagueService: LeagueService, public http: HttpClient) {
    this.storage = localStorage;
    this.storage.get('leagues').then((val) => {
        if(val !== null) {
            this.leagues = val;
        } else {
            this.leagues = [];
        }
    });
  }

  delete(league: League) {
    let index = -1;

    for(let i in this.leagues) {
        let singleLeague = this.leagues[i];
        if(singleLeague.name === league.name && singleLeague.path === league.path) {
            index = parseInt(i);
            break;
        }
    }

    this.leagues.splice(index, 1);
    this.storage.set("leagues", this.leagues);
  }

  loadLeague(league: League) {
    this.http.get('https://api.jaroslawlesniak.pl/league-parser/?id=' + league.path).subscribe(rawData => {
      this.leagueService.setData(rawData);
      this.leagueService.setLeague(league);
      this.router.navigate(['league']);
    });
    
  }

  async addLeague() {
      let promsie = new Promise(async (resolve, reject) => {
        const alertMessage = await this.alertCtrl.create({
            inputs: [
              {
                name: 'name',
                placeholder: 'Nazwa',
                type: "text"
              },
              {
                name: 'path',
                placeholder: 'Ścieżka',
                type: "text"
              }
            ],
            buttons: [
              {
                text: 'Anuluj',
                role: 'cancel'
              },
              {
                text: 'Dodaj',
                handler: async data => {
                    this.leagues.push(new League(data.name, data.path));
                    this.storage.set("leagues", this.leagues);
                }
              }
            ]
          });
        await alertMessage.present();
    });
  }
}
