import { Component } from '@angular/core';
import { NavController, LoadingController,NavParams,AlertController } from 'ionic-angular';
import { Student_Default_ActivityService } from '../../shared/shared';
import { IStudent } from '../models/student';
import {  } from '../pages';

@Component({
    templateUrl: 'create.page.html'
})
export class CreatePage{
    student: IStudent = {
    	id: 0,
    	name: '',	age: 0,	dob: ''
    }
    ;

    constructor(private nav: NavController,public navParams: NavParams, private loadingController : LoadingController, public alertCtrl: AlertController, private student_default_activityservice: Student_Default_ActivityService) { }

    ionViewDidLoad() {
    }

    createStudent() {
        let loader = this.loadingController.create({
          content: 'Getting data...'
        });
        loader.present().then(() => {
          this.student_default_activityservice.createStudent(this.student).subscribe(data => {
            console.log('data', data);
            loader.dismiss();
          },
          err => {
            console.log('error', err);
            loader.dismiss();
          });
        });
    }


}