import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, ToastController, ModalController, MenuController, ActionSheetController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

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

    try {
        const element = await this.alertCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
    } catch (error) {
    }

    try {
        const element = await this.modalCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
    } catch (error) {

    }

    this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url === '/') {
            navigator['app'].exitApp();
        } else if (this.router.url === '/league/table' || this.router.url === '/league/matches') {
          this.router.navigateByUrl('/');
        }
    });
    }, false);
  }
}
