import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { RegisterComponent } from './register.component';
import { FormsModule }    from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [ PagesRoutingModule,FormsModule,CommonModule ],
  declarations: [
    P404Component,
    P500Component,
    RegisterComponent
  ]
})
export class PagesModule { }
