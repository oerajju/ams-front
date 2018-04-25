import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { PermissionService } from './permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'permission.component.html'
})
export class PermissionComponent implements OnInit{
    rbacForm : FormGroup;
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
    
    
    
  constructor(private notify:NotificationService,
    private fb:FormBuilder,
    private RS: PermissionService
    ) {
      this.rbacForm = this.fb.group({name: ['',[Validators.required]],
          display_name: [''],
          description: ['']
     });
  }
  ngOnInit (){
      this.pagination.perPage = this.perPages[0];
  }
  submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.rbacForm.valid) {
            this.model = this.rbacForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.rbacForm.controls).forEach(field => {
                const singleFormControl = this.rbacForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.RS.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.rbacForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(this.error);
            });
        } else {
            this.RS.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.rbacForm.reset();
                this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notifyError(error.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm('Are sure you want to delete this item?')) {
            this.RS.remove(id).subscribe(result => {
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
    }
  getUpdateItem(id) {
        this.RS.getEdit(id).subscribe(
            result => {
                this.model = result;
                this.rbacForm.patchValue(result);
            },
            error => {
                this.notify.notifyError(this.error);
            }
        );
    }
  
  getList(){
      let page =1;
      if(this.pagination.currentPage!=0){
          page = this.pagination.currentPage;
      }
      this.RS.getList(this.pagination.perPage,page,this.searchTerm,this.column,this.isDesc).subscribe(
        (result:any)=>{
            this.lists = result.data;
            this.pagination.total = result.total;
            this.pagination.currentPage = result.current_page;
            ///console.log(result);
        },
        error=>{
            this.notify.notifyError(this.error);
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