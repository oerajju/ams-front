import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { LeaveRequestService } from './leaverequest.service';

@Component({
   //moduleId: module.id,
  templateUrl: 'leaverequest.component.html',
})
export class LeaveRequestComponent{

    LeaveType: boolean = false;
    leave ='';
    saveAsDraft: boolean;
    pending: boolean;
    leaveForm :FormGroup;
    model: any = {};
    DraftButton :boolean = false;
    error = '';
    data ='';
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
    status = [
          {label: 'Draft', value: 0},
          {label: 'pending', value: 1}
    ]
    leave_type = [
        {label: 'Select Leave Type', value: ''},
        { label: 'Sick', value: 1 },
        { label: 'Normal', value: 2 },
        { label: 'Casual', value: 3 }
    ];
  constructor(private notify:NotificationService,
              private fb:FormBuilder,
              private LRS: LeaveRequestService
  ) {
      this.leaveForm = this.fb.group({
        leave_type: [this.leave_type[0].value, [Validators.required]],
        reason: ['', [Validators.required]],
        date_from: ['', [Validators.required]],
        date_to: ['', [Validators.required]],
      });
  }
  ngOnInit() {
    this.pagination.perPage = this.perPages[0];
    this.leave ='0';
  }
  submitForm(status) {
      let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
          id = this.model.id;
        }
          this.leaveForm.value['status']= status;
            if (this.leaveForm.valid) {
                this.model = this.leaveForm.value;
                this.createItem(id);
            } else {
                Object.keys(this.leaveForm.controls).forEach(
                  field => {
                    const singleFormControl = this.leaveForm.get(field);
                    singleFormControl.markAsTouched({onlySelf: true});
                  });
              }
  }
  createItem(id = null) {
    this.LeaveType=false;
        let upd = this.model;
        if (id !== null) {
          if(this.model['status']=='0')
          {
            this.notify.notifyError('Donot cheat again');
          }
          else {
            this.LRS.update(id, upd).subscribe(
              result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.leaveForm.reset();
                this.resetForm();
                //console.log(this.LeaveType);
                this.LeaveType = true;
                this.changeItem(result);
                this.DraftButton=false;
              },
              error => {
                this.notify.notifyError(this.error);
              });
          }
        } else {
            this.LRS.create(upd).subscribe(
              result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.leaveForm.reset();
                this.resetForm();
                this.lists.unshift(result);
                this.pagination.total += 1;
                this.LeaveType=true;
              },
              error => {
                this.notify.notifyError(error.error);
              });
        }
  }
  getList(){
      let page =1;
      if(this.pagination.currentPage!=0){
          page = this.pagination.currentPage;
      }
     this.LRS.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe(
        (result: any)=> {
          this.lists = result.data;
          this.pagination.total = result.total;
          this.pagination.currentPage = result.current_page;
        },
        error=>{
          this.notify.notifyError(this.error);
        });
  }
  removeItem(id){
        let index = this.lists.findIndex(d => d.id === id);
        if (index > -1) {
          this.lists.splice(index, 1);
        }
          this.pagination.total = this.pagination.total-1;
    }

    //update item on the table

  getUpdateItem(id) {
      this.LRS.getEdit(id).subscribe(
        result => {
          this.model = result;
          this.leaveForm.patchValue(result);
          this.DraftButton=true;
        },
        error => {
          this.notify.notifyError(this.error);
        });
    }

    //send draft item on the table
  getEditDraftItem(id) {
      this.LRS.getEdit(id).subscribe(
        result => {
          this.model= result;
          this.sendDraftItem(id);
        },
        error => {
        this.notify.notifyError(this.error);
        });
    } 
  sendDraftItem(id) {
      status='1';
      this.model['status'] = status;
      let upd= this.model;
      this.LRS.update(id,upd).subscribe(
        result =>{
          this.changeItem(result);
          this.notify.notifySuccess("Request was Successfully Send");
        },
        error =>{
          this.notify.notifyError(this.error);
        });
    }  
  deleteItem(id) {
      if (window.confirm('Are sure you want to delete this item?')) {
        this.LRS.remove(id).subscribe(
          result => {
            this.notify.notifySuccess('Item Successfully Deleted.');
            this.removeItem(id);
          },
          error => {
            this.notify.notifyError(error.error);
          });
      }
    }
  changeItem(data) {
      let index = this.lists.findIndex(d => d.id === data.id);
      if (index > -1) {
        this.lists[index] = data;
      }
    }
  resetFilters(){
      this.isDesc = false;
      this.column = '';
      this.searchTerm = '';
      this.pagination.currentPage = 1;
      this.getList();
    }
  changePerPage(perPage:number){
      this.pagination.perPage = perPage;
      this.pagination.currentPage = 1;
      this.getList();
    }
  search() {
      this.getList();
    }
  resetForm() {
      if(this.model.hasOwnProperty('id')) {
        delete this.model.id;
      }
    }  
  sort(column) {
      this.isDesc = this.isDesc?false:true;
      this.column = column;
      this.getList();
    }
}
   
    
    
    
 
 
  
  
  
 