import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeaguePage } from './league.page';

const routes: Routes = [
  {
    path: '',
    component: LeaguePage,
    children: [
      { path: "table", loadChildren: "../table/table.module#TablePageModule"},
      { path: "matches", loadChildren: "../matches/matches.module#MatchesPageModule"},
      { path:'', redirectTo:'/league/table', pathMatch:'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaguePage]
})
export class LeaguePageModule {}
