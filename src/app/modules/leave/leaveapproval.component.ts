import { Component, OnInit, Input } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
//import { ValidationService } from '../../validation.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveApprovalService } from './leaveapproval.service';
import { LeaveRequestService} from './leaverequest.service';

@Component({
   //moduleId: module.id,
  templateUrl: 'leaveapproval.component.html'
})
export class LeaveApprovalComponent{
  status: string;
  model:any ;
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
    leave_type = [
        {label: 'Select Leave Type', value: ''},
        { label: 'Sick', value: 1 },
        { label: 'Normal', value: 2 },
        { label: 'Casual', value: 3 }
    ];

 constructor(private notify: NotificationService,
	private LAS: LeaveApprovalService,
  private LRS: LeaveRequestService
		) {
		}

ngOnInit () {
  this.status ='2';
  this.pagination.perPage = this.perPages[0];
  this.getList();
//this.getUsers();
//this.getEmployee();
//this.getPosts();
}
  getList() {
      let page = 1;
      if (this.pagination.currentPage !== 0) {
          page = this.pagination.currentPage;
      }
      this.LAS.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe(
        (result: any) => {

            this.lists = result.data;
            this.pagination.total = result.total;
            this.pagination.currentPage = result.current_page;
            //console.log(result.data);
        },
        error => {
            this.notify.notifyError(error.message);
        }
      );
  }
  postApproveStatus(id: number,status){
    //status ='2'
     this.model={status} ;
     console.log(this.model);
    this.LRS.update(id, this.model).subscribe(
      result => {
                
                this.notify.notifySuccess('Item Successfully Updated.');
                //console.log(result);
                });
  }
  postRejectStatus(id: number){
    console.log(id);
  }
   changePerPage (perPage: number) {
      this.pagination.perPage = perPage;
      this.pagination.currentPage = 1;
      this.getList();
  }

  search () {
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





//   getUpdateItem(id) {
//         this.RS.getEdit(id).subscribe(
//             result => {
//                 this.model = result;
//                 this.roleForm.patchValue(result);
//             },
//             error => {
//                 this.notify.notifyError(error.message);
//             }
//         );
//     }


 

//   managePermissions(roleId, name) {
//       const ins = this.modal.open(RoleMgmtComponent);
//       ins.componentInstance.name = name;
//       ins.componentInstance.roleId = roleId;
//   }

// }

