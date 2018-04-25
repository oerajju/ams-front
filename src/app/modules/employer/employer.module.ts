import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

import { EmployerComponent, EmpMgmtComponent } from './employer.component';
import { TypeComponent } from './type/type.component';
import { SizeComponent } from './size/size.component';
import { CategoryComponent } from './category/category.component';

import { EmployerService } from './employer.service';
import { TypeService } from './type/type.service';
import { SizeService } from './size/size.service';
import { CategoryService } from './category/category.service';

const routes : Routes = [
    {
        path: '',
        component: EmployerComponent,
        data: {
          title: 'Employer'
        }
    },
    {
        path: 'type',
        component: TypeComponent,
        data: {
          title: 'Employer Type'
        }
    },
    {
        path: 'size',
        component: SizeComponent,
        data: {
          title: 'Employer Size'
        }
    },
    {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Employer Category'
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
        EmployerComponent,
        TypeComponent,
        SizeComponent,
        CategoryComponent,
        EmpMgmtComponent
    ],
    providers: [ EmployerService, TypeService, SizeService, CategoryService ],
    entryComponents: [
        EmpMgmtComponent
    ]
})
export class  EmployerModule {};