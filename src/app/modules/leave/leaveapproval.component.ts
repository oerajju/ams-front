import { Component, OnInit, Input } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
//import { ValidationService } from '../../validation.service';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveApprovalService } from './leaveapproval.service';

@Component({
   //moduleId: module.id,
  templateUrl: 'leaveapproval.component.html'
})
export class LeaveApprovalComponent{
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


 constructor(private notify: NotificationService,
	private LAS: LeaveApprovalService
		) {
		}

ngOnInit () {
this.getList();
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
             console.log(result);
        },
        error => {
            this.notify.notifyError(error.message);
        }
      );
  }



}
//     roleForm: FormGroup;
//     model: any = {};
//     disabled = false;
//     error = '';
//     lists: any;
//     perPages = [10, 20, 50, 100];
//     pagination = {
//         total: 0,
//         currentPage: 0,
//         perPage: 0
//     };
//     searchTerm = '';
//     column = '';
//     isDesc = false;
//     vs = ValidationService;

 
  // ngOnInit () {
      // this.pagination.perPage = this.perPages[0];
  // }
//   submitForm() {
//         let id = null;
//         if (this.model.hasOwnProperty('id') && this.model.id !== '') {
//             id = this.model.id;
//         }
//         if (this.roleForm.valid) {
//             this.model = this.roleForm.value;
//             this.createItem(id);
//         } else {
//             Object.keys(this.roleForm.controls).forEach(field => {
//                 const singleFormControl = this.roleForm.get(field);
//                 singleFormControl.markAsTouched({onlySelf: true});
//             });
//         }
//     }
//     createItem(id = null) {
//         const upd = this.model;
//         if (id !== null) {
//             this.RS.update(id, upd).subscribe(result => {
//                 this.notify.notifySuccess('Item Successfully Updated.');
//                 this.roleForm.reset();
//                 this.resetForm();
//                 this.changeItem(result);
//             }, error => {
//                 this.notify.notifyError(error.message);
//             });
//         } else {
//             this.RS.create(upd).subscribe(result => {
//                 this.notify.notifySuccess('Item Successfully Saved.');
//                 this.roleForm.reset();
//                 this.lists.unshift(result);
//                 this.pagination.total += 1;
//             }, error => {
//                 this.notify.notifyError(error.message);
//             });
//         }

//     }
//     deleteItem(id) {
//         if (window.confirm('Are sure you want to delete this item?')) {
//             this.RS.remove(id).subscribe(result => {
//                 this.notify.notifySuccess('Item Successfully Deleted.');
//                 this.removeItem(id);
//             }, error => {
//                 this.notify.notifyError(error.message);
//             });
//         }
//     }
//     // removes item from table
//     removeItem(id) {
//         const index = this.lists.findIndex(d => d.id === id);
//         if (index > -1) {
//             this.lists.splice(index, 1);
//         }
//         this.pagination.total = this.pagination.total - 1;
//     }
//     // updates item on the table
//     changeItem(data) {
//         const index = this.lists.findIndex(d => d.id === data.id);
//         if (index > -1) {
//              this.lists[index] = data;
//         }
//     }

//     resetForm() {
//         if (this.model.hasOwnProperty('id')) {
//             delete this.model.id;
//         }
//     }
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


//   changePerPage (perPage: number) {
//       this.pagination.perPage = perPage;
//       this.pagination.currentPage = 1;
//       this.getList();
//   }

//   search () {
//       this.getList();
//   }
//   sort(column) {
//       this.isDesc = this.isDesc ? false : true;
//       this.column = column;
//       this.getList();
//   }
//   resetFilters() {
//       this.isDesc = false;
//       this.column = '';
//       this.searchTerm = '';
//       this.pagination.currentPage = 1;
//       this.getList();
//   }

//   managePermissions(roleId, name) {
//       const ins = this.modal.open(RoleMgmtComponent);
//       ins.componentInstance.name = name;
//       ins.componentInstance.roleId = roleId;
//   }

// }

// @Component({
//   templateUrl: './role.mgmt.component.html'
// })
// export class RoleMgmtComponent implements OnInit {
//     @Input() name;
//     @Input() roleId;
//     allPermissions: any= [];
//     prmsMgmtForm: FormGroup;
//     constructor(public activeModal: NgbActiveModal, private rs: RoleService, private notify: NotificationService, private fb: FormBuilder) {
//          this.prmsMgmtForm = this.fb.group({role_id: [this.roleId]});
//     }

//     ngOnInit() {
//         this.getAllPermissions();
//     }
//     getAllPermissions() {
//         this.rs.getAllPermissionsByRole(this.roleId).subscribe(result => {
//            this.allPermissions = result;
//            const prms: any = {role_id: [this.roleId]};
//            this.prmsMgmtForm = this.fb.group(prms);
//            for (const i in this.allPermissions) {
//                if (this.allPermissions[i].rid != null) {
//                    prms[this.allPermissions[i].id] = [true];
//                } else {
//                    prms[this.allPermissions[i].id] = [''];
//                }
//            }
//            this.prmsMgmtForm = this.fb.group(prms);

//         }, error => {
//             this.notify.notifyError(error.message);
//         });
//     }
//     savePermissions() {
//         // make the form values as normal html form values
//         const values: any = {};
//         for (const i in this.prmsMgmtForm.value) {
//             if (this.prmsMgmtForm.value[i] !== '') {
//                 values[i] = this.prmsMgmtForm.value[i];
//             }
//         }
//         this.rs.savePermissionsByRole(values).subscribe(result => {
//             this.notify.notifySuccess(result.message);
//         }, error => {
//             this.notify.notifySuccess(error.message);
//         });
//     }
