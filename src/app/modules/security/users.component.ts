import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit{
    usersForm : FormGroup;
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
    private US: UsersService,
    private modal : NgbModal
    ) {
      this.usersForm = this.fb.group({
          name: ['',[Validators.required]],
          email: ['',[Validators.required, Validators.email]],
          password: ['',[Validators.required]],
          password_confirmation: ['',[Validators.required,this.vs.passwordConfirmValidator]]
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
        if (this.usersForm.valid) {
            this.model = this.usersForm.value;
            this.createItem(id);
        } else {
            Object.keys(this.usersForm.controls).forEach(field => {
                const singleFormControl = this.usersForm.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    createItem(id = null) {
        let upd = this.model;
        if (id !== null) {
            this.US.update(id, upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Updated.');
                this.usersForm.reset();
                this.resetForm();
                this.changeItem(result);
            }, error => {
                this.notify.notifyError(this.error);
            });
        } else {
            this.US.create(upd).subscribe(result => {
                this.notify.notifySuccess('Item Successfully Saved.');
                this.usersForm.reset();
                this.lists.unshift(result);
                this.pagination.total += 1;
            }, error => {
                this.notify.notifyError(this.error);
            });
        }

    }
    deleteItem(id) {
        if (window.confirm('Are sure you want to delete this item?')) {
            this.US.remove(id).subscribe(result => {
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
        this.usersForm.get('password').enable();//setValidators([Validators.required]);
        this.usersForm.get('password_confirmation').enable();//setValidators([Validators.required,this.vs.passwordConfirmValidator]);
    }
  getUpdateItem(id) {
        this.US.getEdit(id).subscribe(
            result => {
                this.model = result;
                let res = {...result};
                delete res['id'];
                this.usersForm.patchValue(res);
                this.usersForm.get('password').disable({});
                this.usersForm.get('password_confirmation').disable({});
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
      this.US.getList(this.pagination.perPage,page,this.searchTerm,this.column,this.isDesc).subscribe(
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
  
  manageUser(userId,name){
      let ins = this.modal.open(UserMgmtComponent);
      ins.componentInstance.name = name;
      ins.componentInstance.userId = userId;
  }
  
}

@Component({
  templateUrl:'./user.mgmt.component.html'
})
export class UserMgmtComponent implements OnInit{
    @Input() name;
    @Input() userId;
    allRoles:any=[];
    usrMgmtForm : FormGroup;
    resetPass : FormGroup;
    vs = ValidationService;
    constructor(public activeModal: NgbActiveModal,private us:UsersService, private notify : NotificationService, private fb:FormBuilder) {
         this.usrMgmtForm = this.fb.group({user_id:['',[Validators.required]]});
         this.resetPass = this.fb.group({
            user_id:['',[Validators.required]],
            password:['',[Validators.required]],
         password_confirmation: ['', [Validators.required, this.vs.passwordConfirmValidator]],
         });
    }
    
    ngOnInit(){
        this.getAllRoles();
        this.usrMgmtForm.get('user_id').setValue(this.userId);
        this.resetPass.get('user_id').setValue(this.userId);
    }
    getAllRoles() {
        this.us.getAllRolesByUser(this.userId).subscribe(result=>{
           this.allRoles = result;
           let prms :any = {user_id:[this.userId]};
           this.usrMgmtForm = this.fb.group(prms);
           for(let i in this.allRoles){
               if(this.allRoles[i].uid != null){
                   prms[this.allRoles[i].id]=[true];
               }else{
                   prms[this.allRoles[i].id]=[''];
               }
           }
           this.usrMgmtForm = this.fb.group(prms);
           
        },error=>{
            this.notify.notifyError(error.message);
        });
    }
    saveUserRoles(){
        //make the form values as normal html form values
        let values:any = {};
        for(let i in this.usrMgmtForm.value){
            if(this.usrMgmtForm.value[i]!=''){
                values[i]=this.usrMgmtForm.value[i];
            }
        }
        this.us.saveRolesByUser(values).subscribe(result=>{
            this.notify.notifySuccess(result.message);
        },error=>{
            this.notify.notifyError(error.message);
        });
    }
    changePass(){
        if (this.resetPass.valid){
            this.us.resetUserPassword(this.resetPass.value).subscribe(
                result=>{
                    this.notify.notifySuccess(result.message);
                },
                error=>{
                    this.notify.notifyError(error.message);
                }
            );
        }else {
            Object.keys(this.resetPass.controls).forEach(field => {
                const singleFormControl = this.resetPass.get(field);
                singleFormControl.markAsTouched({onlySelf: true});
            });
        }
    }
    resetForm(){
        this.resetPass.get('user_id').setValue(this.userId);
    }
  
}