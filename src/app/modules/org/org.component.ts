import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { OrgService } from './org.service';

@Component({
  moduleId: module.id,
  templateUrl: 'org.component.html'
})
export class OrgComponent implements OnInit{
    orgForm : FormGroup;
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
    Chwork_area = ['1','2,3,4,5'];
Chorg_size = ['1','2,3,4,5'];

    
    
  constructor(private notify:NotificationService,
    private fb:FormBuilder,
    private OS: OrgService,
    private mdl: NgbModal
    ) {
      this.orgForm = this.fb.group({name: ['',[Validators.required]],
          alt_name: [''],
          email: ['',[Validators.required, Validators.email]],
          phone: ['',[Validators.required]],
          work_area: [this.Chwork_area[4],[Validators.required]],
          org_size: [this.Chorg_size[4],[Validators.required]],
          cname: [''],
          cemail: [''],
          cphone: ['']
     });
  }
  ngOnInit (){
      this.pagination.perPage = this.perPages[0];
      this.mdl.open('org.component.html');
      //this.getList();
  }
  submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.orgForm.valid) {
            this.model = this.orgForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.orgForm.controls).forEach(field => {
                const singleFormControl = this.orgForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.OS.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.orgForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(this.error);
            });
        } else {
            this.OS.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.orgForm.reset();
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
        this.OS.getEdit(id).subscribe(
            result => {
                this.model = result;
                let res = {...result};
                delete res['id'];
                this.orgForm.setValue(res);
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