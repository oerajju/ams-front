import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { OrganizationService } from './organization.service';

@Component({
  moduleId: module.id,
  templateUrl: 'organization.component.html'
})
export class OrganizationComponent implements OnInit{
    organizationForm : FormGroup;
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
    Chactive = [{label:'Enabled',value:1},{label:'Disabled',value:0},{label:'Expired',value:2}];
    parents = {};
    
  constructor(private notify:NotificationService,
    private fb:FormBuilder,
    private OS: OrganizationService
    ) {
      this.organizationForm = this.fb.group({name: ['',[Validators.required]],
          phone: [''],
          email: ['',[Validators.email]],
          active: [this.Chactive[0].value,[Validators.required]],
          parent_id: ['']
     });
  }
  ngOnInit (){
      this.pagination.perPage = this.perPages[0];
      this.getParents();
  }
  getParents (){
      if (this.model.hasOwnProperty('id') && this.model.id !== '') {
          this.parents=this.OS.getParents(this.model.id);
//              .subscribe(result=>{
//              this.parents = result;
//          },error=>{
//              
//          });
        }else{
            this.parents=this.OS.getParents();
//                .subscribe(result=>{
//              this.parents = result;
//          },error=>{
//              
//          });
        }
  }
  submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.organizationForm.valid) {
            this.model = this.organizationForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.organizationForm.controls).forEach(field => {
                const singleFormControl = this.organizationForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.OS.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.organizationForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(this.error);
            });
        } else {
            this.OS.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.organizationForm.reset();
                this.getParents();
                this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notifyError(this.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm('Are sure you want to delete this item?')) {
            this.OS.remove(id).subscribe(result => {
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
        this.getParents();
    }
  getUpdateItem(id) {
        this.OS.getEdit(id).subscribe(
            result => {
                this.model = result;
                let res = {...result};
                delete res['id'];
                this.getParents();
                this.organizationForm.patchValue(res);
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
      this.OS.getList(this.pagination.perPage,page,this.searchTerm,this.column,this.isDesc).subscribe(
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