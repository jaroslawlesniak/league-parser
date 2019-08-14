import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/services/league.service';
import { League } from 'src/modules/league';
import { StatsPage } from '../../modals/stats/stats.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage {

  private data;
  private league: League = new League('', '');
  private matches = [];

  constructor(private leagueService: LeagueService, private modalController: ModalController) {
    this.data = this.leagueService.getData();
    this.league = this.leagueService.getLeague();
  }

  async displayStats(team) {
    const modal = await this.modalController.create({
      component: StatsPage,
      componentProps: {
        team
      }
    });
    return await modal.present();
  }
}
