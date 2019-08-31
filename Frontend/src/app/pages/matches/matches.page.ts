import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { League } from 'src/modules/league';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage {

  private data;
  private league: League = new League('', '');
  private matches = [];
  private index = 0;

  constructor(private leagueService: LeagueService) {
    this.data = this.leagueService.getData();
    this.league = this.leagueService.getLeague();

    for(let i = 0; i < 2; i++) {
      this.matches.push(this.data.match_days[i]);
    }
  }

  loadNextMatches(e) {
    for(let i = 0; i < 2 && this.index < this.data.match_days.length; i++) {
      this.matches.push(this.data.match_days[this.index]);
      this.index++;
    }
    e.target.complete();
  }

  componentWillMount() {

  }
}
