import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(){}
    
    getToken():string|boolean {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser && currentUser.token;
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.getToken()) {
            req = req.clone({
                setHeaders: {
                  Authorization: 'Bearer '+this.getToken()
                }
            });
        }
        return next.handle(req);
    }
}