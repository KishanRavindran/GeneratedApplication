import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IUser } from './user';
import { } from '..//';
import { ConfigService } from '../../config/config.service';
import { ApiService } from '../../config/api.service';

@Injectable()
export class UserService {
    public selected_id: number;
    constructor(private _http: Http, private config: ConfigService, private apiService: ApiService) { }




    getalluser() {
        return this.apiService.get(this.config.api_url + `/Users/getall/`);
    }
    getallauthority() {
        return this.apiService.get(this.config.api_url + '/authority/getallauthority');
    }
    saveuser(users: any): Observable<any> {
        return this.apiService.post(this.config.api_url + '/Users/saveuser', users);
    }
    updateUser(users: any): Observable<any> {
        console.log("updateuser service calling 0----", users);
        return this.apiService.put(this.config.api_url + '/Users/updateuser', users);

    }

    saveNewRole(users: any): Observable<any> {
        return this.apiService.post(this.config.api_url + '/authority/saveAuthority', users);
    }

    deleteuser(selectedusers: any): Observable<any> {
        return this.apiService.post(this.config.api_url + '/Users/deleteuser', selectedusers);
    }
}