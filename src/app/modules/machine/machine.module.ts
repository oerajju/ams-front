import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { MachineComponent } from './machine.component';
import { MachineService } from './machine.service';

import { OrgMachineComponent } from './orgmachine.component';
import { OrgMachineService } from './orgmachine.service';

import { EmpMachineComponent } from './empmachine.component';
import { EmpMachineService } from './empmachine.service';

const routes: Routes = [
    {
        path: 'register',
        component: MachineComponent,
        data: {
            title: 'Register Machine'
        }
    }, {
        path: 'bind-org',
        component: OrgMachineComponent,
        data: {
            title: 'Organisation & Machnes'
        }
    }, {
        path: 'bind-emp',
        component: EmpMachineComponent,
        data: {
            title: 'Employees & Machines'
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
    ],
    declarations: [
        MachineComponent, OrgMachineComponent, EmpMachineComponent
    ],
    providers: [MachineService, EmpMachineService, OrgMachineService]
})
export class MachineModule { };
