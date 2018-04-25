import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { OneComponent } from './one.component';
import { OneService } from './one.service';

const routes : Routes = [
    {
        path: '',
        component: OneComponent,
        data: {
          title: 'One'
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
        OneComponent
    ],
    providers: [ OneService ]
})
export class  OneModule {};