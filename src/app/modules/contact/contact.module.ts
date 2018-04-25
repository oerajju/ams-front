import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';

const routes : Routes = [
    {
        path: '',
        component: ContactComponent,
        data: {
          title: 'Contact'
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
        ContactComponent
    ],
    providers: [ ContactService ]
})
export class  ContactModule {};