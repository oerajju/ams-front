import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { OrgComponent } from './org.component';
import { OrgService } from './org.service';

const routes : Routes = [
    {
        path: '',
        component: OrgComponent,
        data: {
          title: 'Org'
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
        OrgComponent
    ],
    providers: [ OrgService ]
})
export class  OrgModule {};