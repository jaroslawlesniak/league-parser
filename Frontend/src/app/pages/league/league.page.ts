import { Component, OnInit } from '@angular/core';
import { League } from 'src/modules/league';
import { LeagueService } from 'src/app/services/league.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-league',
  templateUrl: './league.page.html',
  styleUrls: ['./league.page.scss'],
})
export class LeaguePage implements OnInit {
  

  private league: League = new League("Liga", "Test");

  constructor(private leagueService: LeagueService, private http: Http) { 
    this.league = this.leagueService.getLeague();

    this.http.get('https://api.jaroslawlesniak.pl/league-parser/?id=' + this.league.path).subscribe(rawData => {
      let data = rawData.json();
    });
  }

  ngOnInit() {

  }

}
