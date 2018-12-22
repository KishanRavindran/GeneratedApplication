import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage, CreatePage } from '../pages/pages';
import { Student_Default_ActivityService, SharedService } from '../shared/shared';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { customHttpProvider } from '../_helpers/custom-http';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import {CookieService} from 'angular2-cookie/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MyApp,
HomePage,
CreatePage,
// LoginPage
  ],
  imports: [
    BrowserModule,
    RouterModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
HomePage,
CreatePage,
// LoginPage
  ],
  providers: [
    RouterModule,
    CookieService,
    ConfigService,
    ApiService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    customHttpProvider,
Student_Default_ActivityService
,
SharedService
,
// AuthenticationService

  ]
})
export class AppModule {}