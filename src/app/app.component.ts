import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SharedService } from '../shared/shared.service';
import { HomePage, CreatePage } from '../pages/pages';
import { Student_Default_ActivityService } from '../shared/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  activities: Array<{title: string, showSubMenu: boolean, pages: Array<{title: string, component: any}>}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
          private shared_service: SharedService, private authenticationService: Student_Default_ActivityService) {
    this.initializeApp();
    this.activities = [
      {
        title: 'Student_Default_Activity',
        showSubMenu : false,
        pages: [
          {
            title: 'createLabel',
            component: CreatePage
          }
        ]
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();

      if(!this.isLoggedIn()){
      	// this.nav.setRoot(LoginPage);
      }
      null
    });
  }

  openSubmenu(act){
    act.showSubMenu = !act.showSubMenu;
  }

  openPage(page) {
    this.nav.push(page.component);
  }


  isLoggedIn(){
  	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	if(currentUser == null){
  	return false
  	}else{
  	 return true
  	}}
  // logout() {
  // 	this.authenticationService.logout();
  // 	this.nav.setRoot(LoginPage);
  // }
  null

}
