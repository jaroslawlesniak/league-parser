import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/services/league.service';
import { League } from 'src/modules/league';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

  private data;
  private league: League = new League("", "");

  constructor(private leagueService: LeagueService) { 
    this.data = this.leagueService.getData();
    this.league = this.leagueService.getLeague();
  }

  ngOnInit() {
  }

}
