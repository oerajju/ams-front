import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

@Injectable()
export class UsersService {
    path: string = 'security/users';

    constructor(private api: ApiService) { }

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
    saveRolesByUser(data: any) {
        return this.api.post(this.path + '/addroles', data);
    }
    getAllRolesByUser(userId) {
        return this.api.get(this.path + '/getroles/' + userId);
    }
    resetUserPassword(data) {
        return this.api.post(this.path + '/resetpass', data);
    }
    getOrganizations(id?) {
        if (typeof id == 'undefined') {
            return this.api.get('organization' + '/organization' + '/list');
        }
        return this.api.get('organization' + '/organization' + '/list/' + id);
    }
    getEmployees(orgid) {
        return this.api.get('organization/employee' + '/list/' + orgid);
    }
}
