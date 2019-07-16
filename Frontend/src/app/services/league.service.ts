import { Injectable } from '@angular/core';
import { League } from 'src/modules/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private league: League = new League("", "");

  constructor() { }

  getLeague(): League {
    return this.league;
  }

  setLeague(league: League) {
    this.league.name = league.name;
    this.league.path = league.path;
  }
}
