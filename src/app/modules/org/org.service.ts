import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrgService {
    baseUrl : string = 'http://localhost/jpn/org';
    
  constructor(private http:HttpClient) {
  }
  
  getList(perPage, page, searchTerm?, sortKey?, sortDir?) {
        let urlPart = '?perPage=' + perPage + '&page=' + page;
        if (typeof searchTerm != 'undefined' || searchTerm != '') {
            urlPart += '&searchOption=all&searchTerm=' + searchTerm;
        }
        if (typeof sortKey != 'undefined' || sortKey != '') {
            urlPart += '&sortKey=' + sortKey;
        }
        if (typeof sortDir != 'undefined' && sortKey != '') {
            if (sortDir) {
                urlPart += '&sortDir=desc';
            } else {
                urlPart += '&sortDir=asc';
            }
        }
        return this.http.get(this.baseUrl + urlPart);
    }
    create(data) {
        return this.http.post(this.baseUrl, data);
    }
    update(id, data) {
        return this.http.put(this.baseUrl + '/' + id, data);
    }
    getEdit(id) {
        return this.http.get(this.baseUrl + '/' + id + '/edit');
    }
    remove(id) {
        return this.http.delete(this.baseUrl + '/' + id);
    }
}
