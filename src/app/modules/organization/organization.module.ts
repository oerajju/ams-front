import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { OrganizationComponent } from './organization.component';
import { OrganizationService } from './organization.service';
import { PostComponent } from './post.component';
import { PostService } from './post.service';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';

const routes : Routes = [
    {
        path: 'organization',
        component: OrganizationComponent,
        data: {
          title: 'Organization'
        }
    },
    {
        path: 'post',
        component: PostComponent,
        data: {
          title: 'Posts'
        }
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        data: {
          title: 'Employee'
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
        OrganizationComponent, PostComponent, EmployeeComponent
    ],
    providers: [ OrganizationService, PostService,  EmployeeService]
})
export class  OrganizationModule {};