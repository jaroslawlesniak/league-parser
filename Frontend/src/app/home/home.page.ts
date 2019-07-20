import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { League } from '../../modules/league';
import { AlertController, LoadingController, Platform, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LeagueService } from '../services/league.service';
import { HttpClient } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private storage: Storage;
  leagues: League[];
  data2: League;

  constructor(public localStorage: Storage, 
              private alertCtrl: AlertController, 
              private router: Router, 
              private leagueService: LeagueService, 
              public http: HttpClient, 
              private statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString("#ffffff");
    this.storage = localStorage;
    this.storage.get('leagues').then((val) => {
        if(val !== null) {
            this.leagues = val;
        } else {
            this.leagues = [];
        }
    });
  }

  async delete(league: League) {
    const alert = await this.alertCtrl.create({
      header: "Potwierdzenie",
      message: "Czy napewno chcesz usunać ligę <b>" + league.name + "</b>?",
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel'
        }, {
          text: 'Usuń',
          cssClass: "alert-btn",
          handler: () => {
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
        }
      ]
    });
    await alert.present();
  }

  modyfy(league: League, index) {
    let promsie = new Promise(async (resolve, reject) => {
      const alertMessage = await this.alertCtrl.create(<any>{
          header: "Edytuj ligę",
          title: 'Edytuj ligę',
          inputs: [
            {
              name: 'name',
              placeholder: 'Nazwa',
              type: "text",
              value: league.name
            },
            {
              name: 'path',
              placeholder: 'Adres URL',
              type: "text",
              value: league.path
            }
          ],
          buttons: [
            {
              text: 'Anuluj',
              role: 'cancel'
            },
            {
              text: 'Zmień',
              cssClass: "alert-btn",
              handler: async data => {
                  this.leagues[index].name = data.name;
                  this.leagues[index].path = data.path;
                  this.storage.set("leagues", this.leagues);
              }
            }
          ]
        });
      await alertMessage.present();
  });
  }

  loadLeague(league: League) {
    this.leagueService.displayLoadingSpinner();
    this.http.get('https://api.jaroslawlesniak.pl/league-parser/?id=' + league.path).subscribe(rawData => {
      this.leagueService.setData(rawData);
      this.leagueService.setLeague(league);
      this.leagueService.hideLoadingSpinner();
      this.router.navigate(['league']);
    });
  }

  async addLeague() {
      let promsie = new Promise(async (resolve, reject) => {
        const alertMessage = await this.alertCtrl.create(<any>{
            header: "Dodaj ligę",
            title: "Dodaj ligę",
            inputs: [
              {
                name: 'name',
                placeholder: 'Nazwa',
                type: "text"
              },
              {
                name: 'path',
                placeholder: 'Adres URL',
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
                cssClass: "alert-btn",
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
