import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';

@Injectable()
export class EmpMachineService {
    path = 'empmachine';

constructor(private api: ApiService) {}

    getList(perPage, page, searchTerm?, sortKey?, sortDir?) {
        return this.api.getList(this.path, perPage, page, searchTerm, sortKey, sortDir);
    }
    create(data) {
        return this.api.create(this.path, data);
    }
    update(id, data) {
        return this.api.update(this.path, id, data);
    }
    getEdit(id) {
        return this.api.getOne(this.path, id);
    }
    remove(id) {
        return this.api.remove(this.path, id);
    }
    getOrgs() {
        return this.api.get('organization' + '/organization' + '/list');
    }
    getMachines(orgId) {
        return this.api.get('machine/list/org/' + orgId);
    }
    getEmployee(orgId) {
        return this.api.get('organization/employee/list/' + orgId);
    }
}
