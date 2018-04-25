import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContactService {
    baseUrl : String = "http://localhost/jobportalnepal/contact";
  constructor(private http:HttpClient) { }
  
  getList(perPage,page):Observable<any>{
      return this.http.get(this.baseUrl+'?perPage='+perPage+'&page='+page);
  }
  
  create(data):Observable<any>{
      return this.http.post('http://localhost/jobportalnepal/contact',data);
  }
  getEdit(id):Observable<any>{
      return this.http.get(this.baseUrl + '/'+id);
  }

}
