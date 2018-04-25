import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { PermissionComponent } from './permission.component';
import { PermissionService } from './permission.service';
import { RoleComponent, RoleMgmtComponent } from './role.component';
import { RoleService } from './role.service';
import { UsersComponent, UserMgmtComponent } from './users.component';
import { UsersService } from './users.service';

const routes : Routes = [
    {
        path: 'permission',
        component: PermissionComponent,
        data: {
          title: 'Permissions'
        }
    },
    {
        path: 'role',
        component: RoleComponent,
        data: {
          title: 'Roles'
        }
    },
    {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
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
        PermissionComponent, RoleComponent, RoleMgmtComponent, UsersComponent, UserMgmtComponent
    ],
    providers: [ PermissionService, RoleService,UsersService],
    entryComponents: [
        RoleMgmtComponent, UserMgmtComponent
    ]
})
export class  SecurityModule {};