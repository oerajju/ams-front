import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { EmpMachineService } from './empmachine.service';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    templateUrl: 'empmachine.component.html'
})
export class EmpMachineComponent implements OnInit {
    empmachineForm: FormGroup;
    model: any = {};
    disabled = false;
    lists: any;
    perPages = [10, 20, 50, 100];
    pagination = {
        total: 0,
        currentPage: 0,
        perPage: 0
    };
    searchTerm = '';
    column = '';
    isDesc = false;
    vs = ValidationService;
    Chorg_id;
    Chmachine_id;
    Chstatus = [
        { label: 'Enabled', value: 1 },
        { label: 'Disabled', value: 0 },
        { label: 'Expired', value: 2 }
    ];
    orgs: Observable<any>;
    machines: Observable<any>;
    emps: Observable<any>;

    constructor(private notify: NotificationService,
        private fb: FormBuilder,
        private ES: EmpMachineService
    ) {
        this.empmachineForm = this.fb.group({
            org_id: ['', [Validators.required]],
            machine_id: ['', [Validators.required]],
            emp_id: ['', [Validators.required]],
            machine_userid: ['', [Validators.required]],
            status: [this.Chstatus[0].value, [Validators.required]],
            remarks: ['']
        });
    }
    ngOnInit() {
        this.pagination.perPage = this.perPages[0];
        this.getOrgs();
    }
    getOrgs() {
        this.orgs = this.ES.getOrgs();
    }

    getMachines(orgId) {
        this.machines = this.ES.getMachines(orgId);
    }

    getEmployees(orgId) {
        this.emps = this.ES.getEmployee(orgId);
    }

    submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }

        if (this.empmachineForm.valid) {
            this.model = this.empmachineForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.empmachineForm.controls).forEach(field => {
                const singleFormControl = this.empmachineForm.get(field);
                singleFormControl.markAsTouched({ onlySelf: true });
            });
        }
    }
    createItem(id = null) {
        const upd = this.model;
        if (id !== null) {
            this.ES.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.resetForm();
                this.empmachineForm.reset();
                this.getList();
                // this.changeItem(result);
            }, error => {
                this.model.id = id;
                this.notify.notify(error.error);
            });
        } else {
            this.ES.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.resetForm();
                this.empmachineForm.reset();
                this.getList();
                // this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notify(error.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm('Are sure you want to delete this item?')) {
            this.ES.remove(id).subscribe(result => {
                this.notify.notify(result);
                this.removeItem(id);
            }, error => {
                this.notify.notify(error.error);
            });
        }
    }
    // removes item from table
    removeItem(id) {
        const index = this.lists.findIndex(d => d.id === id);
        if (index > -1) {
            this.lists.splice(index, 1);
        }
        this.pagination.total = this.pagination.total - 1;
    }
    // updates item on the table
    changeItem(data) {
        const index = this.lists.findIndex(d => d.id === data.id);
        if (index > -1) {
            this.lists[index] = data;
        }
    }

    resetForm() {
        if (this.model.hasOwnProperty('id')) {
            delete this.model.id;
        }
    }
    getUpdateItem(id) {
        this.ES.getEdit(id).subscribe(
            result => {
                this.model = result;
                this.getEmployees(result.org_id);
                this.getMachines(result.org_id);
                this.empmachineForm.patchValue(result);
            },
            error => {
                this.notify.notify(error.error);
            }
        );
    }

    getList() {
        let page = 1;
        if (this.pagination.currentPage !== 0) {
            page = this.pagination.currentPage;
        }
        this.ES.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe(
            (result: any) => {
                this.lists = result.data;
                this.pagination.total = result.total;
                this.pagination.currentPage = result.current_page;
                // console.log(result);
            },
            error => {
                this.notify.notify(error.error);
            }
        );
    }

    changePerPage(perPage: number) {
        this.pagination.perPage = perPage;
        this.pagination.currentPage = 1;
        this.getList();
    }

    search() {
        this.getList();
    }
    sort(column) {
        this.isDesc = this.isDesc ? false : true;
        this.column = column;
        this.getList();
    }
    resetFilters() {
        this.isDesc = false;
        this.column = '';
        this.searchTerm = '';
        this.pagination.currentPage = 1;
        this.getList();
    }


}
