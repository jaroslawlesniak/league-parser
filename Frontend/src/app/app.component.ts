import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, ToastController, ModalController, MenuController, ActionSheetController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(RouterOutlet) routerOutlets: QueryList<RouterOutlet>;

  constructor(private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router,
    private toast: ToastController) {
      this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    document.addEventListener("backbutton", async (e) => {
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
    } catch (error) {
    }

    // close alert
    try {
        const element = await this.alertCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
    } catch (error) {
    }

    // close modal
    try {
        const element = await this.modalCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
    } catch (error) {
        console.log(error);

    }

    this.routerOutlets.forEach(async (outlet: RouterOutlet) => {
          if (this.router.url === '/') {
            if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                navigator['app'].exitApp();

            } else {
                const toastMsg = await this.toast.create({
                  message: "Wciśnij jeszcze raz, żeby zamknąć",
                  duration: 2000
                });
                toastMsg.present();
                this.lastTimeBackPress = new Date().getTime();
            }
        }
    });
    }, false);
  }
}
