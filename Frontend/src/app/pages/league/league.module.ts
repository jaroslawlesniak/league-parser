import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaguePage } from './league.page';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: '',
    component: LeaguePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    HttpModule
  ],
  declarations: [LeaguePage]
})
export class LeaguePageModule {}
