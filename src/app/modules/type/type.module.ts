import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { TypeComponent } from './type.component';
import { TypeService } from './type.service';

const routes : Routes = [
    {
        path: '',
        component: TypeComponent,
        data: {
          title: 'Type'
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
        TypeComponent
    ],
    providers: [ TypeService ]
})
export class  TypeModule {};