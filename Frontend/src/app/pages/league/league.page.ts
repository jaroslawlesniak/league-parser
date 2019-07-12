import { Component, OnInit } from '@angular/core';
import { League } from 'src/modules/league';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-league',
  templateUrl: './league.page.html',
  styleUrls: ['./league.page.scss'],
})
export class LeaguePage implements OnInit {

  private league: League = new League("Liga", "Test");

  constructor(private platform: Platform) { 
    
  }

  ngOnInit() {
  }

}
