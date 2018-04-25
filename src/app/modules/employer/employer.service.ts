import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';

@Injectable()
export class EmployerService {
    genPath : string = 'employer';
    path : string = 'employer/employer';
    
constructor(private api:ApiService) {}

    getList(perPage, page, searchTerm?, sortKey?, sortDir?) {
        return this.api.getList(this.path,perPage, page, searchTerm, sortKey, sortDir);
    }
    create(data) {
        return this.api.create(this.path,data);
    }
    update(id, data) {
        return this.api.update(this.path,id,data);
    }
    getEdit(id) {
        return this.api.getOne(this.path,id);
    }
    remove(id) {
        return this.api.remove(this.path,id);
    }
    
    getEmpSize(){
        return this.api.get(this.genPath+'/size/list');
    }
    getEmpType(){
        return this.api.get(this.genPath+'/type/list');
    }
    getEmpCategory(){
        return this.api.get(this.genPath+'/category/list');
    }
}
