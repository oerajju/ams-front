import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { EmployerService } from './employer.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  templateUrl: 'employer.component.html'
})
export class EmployerComponent implements OnInit{
    employerForm : FormGroup;
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
    Chorg_type = [];
    Chownership = [];
    Chsize_of_org = [];

    
    
  constructor(private notify:NotificationService,
    private fb:FormBuilder,
    private ES: EmployerService,
    private modal : NgbModal
    ) {
      this.employerForm = this.fb.group({
          name: ['',[Validators.required]],
          alt_name: [''],
          org_type: ['',[Validators.required]],
          ownership: ['',[Validators.required]],
          size_of_org: [''],
          address: [''],
          phone: ['',[Validators.required]],
          email: ['',[Validators.required, Validators.email]],
          website: ['']
     });
  }
  ngOnInit (){
      this.pagination.perPage = this.perPages[0];
      //this.getList();
      this.loadCategory();
      this.loadSize();
      this.loadType();
      
  }
  submitForm() {
        let id = null;
        if (this.model.hasOwnProperty('id') && this.model.id !== '') {
            id = this.model.id;
        }
        if (this.employerForm.valid) {
            this.model = this.employerForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.employerForm.controls).forEach(field => {
                const singleFormControl = this.employerForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.ES.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.employerForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError();
            });
        } else {
            this.ES.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.employerForm.reset();
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
        this.ES.getEdit(id).subscribe(
            result => {
                this.model = result;
                this.employerForm.patchValue(result);
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
      this.ES.getList(this.pagination.perPage,page,this.searchTerm,this.column,this.isDesc).subscribe(
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
  
  //specific code for the component
  loadCategory(){
      this.ES.getEmpCategory().subscribe(
      result=>{
          this.Chorg_type = result;
      }
      );
  }
  loadSize(){
      this.ES.getEmpSize().subscribe(
      result=>{
          this.Chsize_of_org = result;
      }
      );
  }
  loadType(){
      this.ES.getEmpType().subscribe(
      result=>{
          this.Chownership = result;
      }
      );
  }
  
  manageDetails(empId,empName){
      let ins = this.modal.open(EmpMgmtComponent);
      ins.componentInstance.empName = empName;
      ins.componentInstance.empId = empId;
  }
}

@Component({
  templateUrl:'./emp.mgmt.component.html'
})
export class EmpMgmtComponent implements OnInit{
    @Input() empName;
    @Input() empId;
    constructor(public activeModal: NgbActiveModal,private notify : NotificationService, private fb:FormBuilder) {
            
    }
    ngOnInit(){
        
    }
}