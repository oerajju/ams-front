import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
 
@Injectable()
export class AuthGuard implements CanActivate {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router: Router) { }
 
    canActivate() {
        
       // if the token exists and not expired,
       //else remove the token & prompt for login. 
        if (localStorage.getItem('currentUser') && !this.jwtHelper.isTokenExpired(JSON.parse(localStorage.getItem('currentUser')).token)) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}

@Injectable()
export class LoginGuard implements CanActivate {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router: Router) { }
 
    canActivate() {
        
       // if the token exists and not expired,
       //else remove the token & prompt for login. 
        if (localStorage.getItem('currentUser') && !this.jwtHelper.isTokenExpired(JSON.parse(localStorage.getItem('currentUser')).token)) {
            // logged in so return true
            return false;
        }
 
        // not logged in so redirect to login page
        //this.router.navigate(['/dashboard']);
        return true;
    }
}
