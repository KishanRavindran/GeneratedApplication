import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public baseUrl: string = "http://apps.geppettosoftware.com/testsample-web-10010";
    public loggedIn: boolean = false;
}