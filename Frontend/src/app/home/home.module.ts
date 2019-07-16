import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage'

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
