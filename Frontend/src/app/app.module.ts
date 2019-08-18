import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LeagueService } from './services/league.service';
import { StatsPage } from './modals/stats/stats.page';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [AppComponent, StatsPage],
  entryComponents: [StatsPage],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LeagueService
  ],
  bootstrap: [AppComponent],
  exports: [StatsPage]
})
export class AppModule {}
