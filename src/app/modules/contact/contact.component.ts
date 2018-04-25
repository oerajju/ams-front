import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../notification.service';
import {ValidationService} from '../../validation.service';
import {ContactService} from './contact.service';

@Component({
    moduleId: module.id,
    templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    model: any = {};
    disabled = false;
    error = '';
    lists: any;
    //define perPageArray
    perPages = [10, 20, 50, 100];
    pagination = {
        total: 0,
        currentPage: 0,
        perPage: 0
    };
    searchTerm: string = '';
    column: string = '';
    isDesc: boolean = false;
    vs = ValidationService;
    collGender = ["Male", "Female", "Other"];
    formNameRelated;

    constructor(private notify: NotificationService,
        private fb: FormBuilder,
        private cs: ContactService
    ) {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile_no: ['', Validators.required],
            gender: [this.collGender[0], Validators.required],
            age: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.pagination.perPage = this.perPages[0];
        //this.getList();
    }
    submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.contactForm.valid) {
            this.model = this.contactForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.contactForm.controls).forEach(field => {
                const singleFormControl = this.contactForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }

    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.cs.update(id, upd).subscribe(result => {
                this.notify.notifySuccess("Item Successfully Updated.");
                this.contactForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(this.error);
            });
        } else {
            this.cs.create(upd).subscribe(result => {
                this.notify.notifySuccess("Item Successfully Saved.");
                this.contactForm.reset();
                this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notifyError(this.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm("Are sure you want to delete this item")) {
            this.cs.remove(id).subscribe(result => {
                this.notify.notifySuccess("Item Successfully Deleted.");
                this.removeItem(id);
            }, error => {
                this.notify.notifyError(this.error);
            });
        }
    }
    //removes item from table
    removeItem(id){
        let index = this.lists.findIndex(d => d.id === id);
        if (index > -1) {
            this.lists.splice(index, 1);
        }
        this.pagination.total = this.pagination.total-1;
    }
    //updates item on the table
    changeItem(data) {
        let index = this.lists.findIndex(d => d.id === data.id);
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
        this.cs.getEdit(id).subscribe(
            result => {
                this.model = result;
                let res = {...result};
                delete res['id'];
                this.contactForm.setValue(res);
            },
            error => {
                this.notify.notifyError(this.error);
            }
        );
    }

    getList() {
        let page = 1;
        if (this.pagination.currentPage != 0) {
            page = this.pagination.currentPage;
        }
        this.cs.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe(
            (result: any) => {
                this.lists = result.data;
                this.pagination.total = result.total;
                this.pagination.currentPage = result.current_page;
                ///console.log(result);
            },
            error => {
                this.notify.notifyError(this.error);
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
        this.column = "";
        this.searchTerm = "";
        this.pagination.currentPage = 1;
        this.getList();
    }

    formByRelation() {
        //first get data from the related url tehn
        let data = [
            {value: 'dummy', 'text': "Dummy"},
            {value: 'dummy1', 'text': "Dummy1"},
        ];
        this.formNameRelated = data;
    }

}
