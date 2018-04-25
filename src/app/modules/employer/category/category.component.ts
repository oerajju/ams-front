import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../notification.service';
import { ValidationService } from '../../../validation.service';
import { CategoryService } from './category.service';

@Component({
  moduleId: module.id,
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit{
    categoryForm : FormGroup;
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
    private CS: CategoryService
    ) {
      this.categoryForm = this.fb.group({name: ['',[Validators.required]]
     });
  }
  ngOnInit (){
      this.pagination.perPage = this.perPages[0];
      //this.getList();
  }
  submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.categoryForm.valid) {
            this.model = this.categoryForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.categoryForm.controls).forEach(field => {
                const singleFormControl = this.categoryForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.CS.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.categoryForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(this.error);
            });
        } else {
            this.CS.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.categoryForm.reset();
                this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notifyError(this.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm('Are sure you want to delete this item?')) {
            this.CS.remove(id).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Deleted.');
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
        this.CS.getEdit(id).subscribe(
            result => {
                this.model = result;
                let res = {...result};
                delete res['id'];
                this.categoryForm.setValue(res);
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
      this.CS.getList(this.pagination.perPage,page,this.searchTerm,this.column,this.isDesc).subscribe(
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