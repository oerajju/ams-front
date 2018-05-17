import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { EmployeeService } from './employee.service';

@Component({
  moduleId: module.id,
  templateUrl: 'employee.component.html'
})
export class EmployeeComponent implements OnInit{
    employeeForm : FormGroup;
    model: any = {};
    disabled = false;
    error = '';
    lists:any;
    perPages = [10,20,50,100];
    pagination = {
        total:0,
        currentPage:0,
        perPage:0
    };
    searchTerm: string = '';
    column : string = '';
    isDesc: boolean = false;
    vs = ValidationService;
    orgs:any;
    posts:any;
    Chactive = [{label:'Enabled',value:1},{label:'Disabled',value:0},{label:'Expired',value:2}];
    Chreports_to:any;

    
    
  constructor(private notify:NotificationService,
    private fb:FormBuilder,
    private ES: EmployeeService
    ) {
      this.employeeForm = this.fb.group({
          orgid:['',[Validators.required]],
          postid:['',[Validators.required]],
          firstname: ['',[Validators.required]],
          midname: [''],
          lastname: ['',[Validators.required]],
          address: ['',[Validators.required]],
          phone: ['',[Validators.required]],
          email: [''],
          active: [this.Chactive[0].value,[Validators.required]],
          reports_to: [''],
          cnt_start_date: [''],
          cnt_term_date: ['']
     });
  }
  ngOnInit (){
      this.pagination.perPage = this.perPages[0];
      this.getOrgs();
      this.getPosts();
  }
  getOrgs(){
      this.orgs = this.ES.getOrganizations();
  }
  getPosts(){
      this.posts = this.ES.getPosts();
  }
  getEmployees(orgid?){
    if(typeof orgid == 'undefined'){
        this.Chreports_to = Observable.empty();
    }
    this.Chreports_to = this.ES.getEmployees(orgid);
  }
  submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.employeeForm.valid) {
            this.model = this.employeeForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.employeeForm.controls).forEach(field => {
                const singleFormControl = this.employeeForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.ES.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.employeeForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(error.error);
            });
        } else {
            this.ES.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.employeeForm.reset();
                this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notifyError(error.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm('Are sure you want to delete this item?')) {
            this.ES.remove(id).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Deleted.');
                this.removeItem(id);
            }, error => {
                this.notify.notifyError(error.error);
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
        this.Chreports_to = Observable.empty();
    }
  getUpdateItem(id) {
        this.ES.getEdit(id).subscribe(
            result => {
                this.model = result;
                let res = {...result};
                delete res['id'];
                this.getEmployees(res.orgid);
                this.employeeForm.patchValue(res);
            },
            error => {
                this.notify.notifyError(error.error);
            }
        );
    }
  
  getList(){
      let page =1;
      if(this.pagination.currentPage!=0){
          page = this.pagination.currentPage;
      }
      this.ES.getList(this.pagination.perPage,page,this.searchTerm,this.column,this.isDesc).subscribe(
        (result:any)=>{
            this.lists = result.data;
            this.pagination.total = result.total;
            this.pagination.currentPage = result.current_page;
            ///console.log(result);
        },
        error=>{
            this.notify.notifyError(error.error);
        }
      );
  }
  
  changePerPage (perPage:number){
      this.pagination.perPage = perPage;
      this.pagination.currentPage = 1;
      this.getList();
  }
  
  search (){
      this.getList();
  }
  sort(column){
      this.isDesc = this.isDesc?false:true;
      this.column = column;
      this.getList();
  }
  resetFilters(){
      this.isDesc = false;
      this.column = '';
      this.searchTerm = '';
      this.pagination.currentPage = 1;
      this.getList();
  }
}