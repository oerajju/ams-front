import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { LeaveRequestComponent} from './leaverequest.component';
import { LeaveApprovalComponent } from './leaveapproval.component';
import { LeaveApprovalService} from './leaveapproval.service';
import { LeaveRequestService } from './leaverequest.service';

const routes : Routes = [
    {
        path: 'leave-request',
        component: LeaveRequestComponent,
        data: {
          title: 'Leave Request'
        }
    },
    {
        path: 'leave-approval',
        component: LeaveApprovalComponent,
        data: {
          title: 'Leave Approval'
        }
    }
];

@NgModule({
    imports : [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
     ],
    declarations : [
        LeaveRequestComponent, LeaveApprovalComponent
    ],
    providers: [LeaveRequestService,LeaveApprovalService],
    // entryComponents: [
    //     RoleMgmtComponent, UserMgmtComponent
    // ]
})
export class  LeaveModule {};