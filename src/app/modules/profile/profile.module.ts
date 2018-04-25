import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

const routes : Routes = [
    {
        path: '',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
    }
];

@NgModule({
    imports : [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        SharedModule
        
    ],
    declarations : [
        ProfileComponent
    ],
    providers :[
        ProfileService
    ]
})
export class  ProfileModule {};