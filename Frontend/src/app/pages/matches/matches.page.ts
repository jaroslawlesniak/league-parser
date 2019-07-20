import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { League } from 'src/modules/league';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, AfterContentChecked {

  private data;
  private league: League = new League("", "");

  constructor(private leagueService: LeagueService) { 
    this.data = this.leagueService.getData();
    this.league = this.leagueService.getLeague();
  }
}
