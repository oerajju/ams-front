import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { DebounceClickDirective } from '../../directives/debounce.click';

const routes : Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
          title: 'Login'
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
        LoginComponent, DebounceClickDirective
    ],
})
export class  AuthModule {};