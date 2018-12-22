import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';

@Injectable()
export class Student_Default_ActivityService {
    constructor(private http : Http,private config: ConfigService, private apiService: ApiService) {

    }


    createStudent(student):Observable<any> {
       return this.apiService.post(this.config.api_url+`/Student_Default_Activity/Student/`,student);
    }
    updateStudent(student):Observable<any> {
       return this.apiService.put(this.config.api_url+`/Student_Default_Activity/Student/`,student);
    }
    search_for_updateStudent(student_id):Observable<any> {
       return this.apiService.get(this.config.api_url+`/Student_Default_Activity/Student/${student_id}`);
    }
    deleteStudent(student):Observable<any> {
       return this.apiService.delete(this.config.api_url+`/Student_Default_Activity/Student/${student.id}`);
    }
    get_all_Student():Observable<any> {
       return this.apiService.get(this.config.api_url+`/Student_Default_Activity/Student/`);
    }

}