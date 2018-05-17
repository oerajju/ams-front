import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../app.config';
import {ApiService} from '../../api.service';

@Injectable()
export class ProfileService {
    private path : string = AppConfig.baseUrl + 'auth';
    public token: string;
 
    constructor(private http: HttpClient, private api: ApiService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
      getEmployeeInfoByUserId()
     {
         return this.api.get('organization/employeeuser');
     }
     changePassword(data: any)
     {
         return this.api.post('auth/change-password',data);
     }
    public login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.path,{email:username,password:password}).pipe(
            map(response=>{
                let resp = JSON.parse(JSON.stringify(response));
                let token = resp && resp.token;
                if(token){
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ email: username, token: resp.token }));
                    return true;
                }else{
                    return false;
                }
            })
        );
    }
 
    public logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}