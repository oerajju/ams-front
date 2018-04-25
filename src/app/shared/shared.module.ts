import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationMessage } from './validation-message/validation.message';
import { PageHelper } from './page-helper/page-helper';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [ValidationMessage, PageHelper],
  exports:[ValidationMessage,PageHelper ]
})
export class SharedModule { }
