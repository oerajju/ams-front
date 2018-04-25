import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../validation.service';

@Component({
  selector: 'validation-message',
  template: `<div class="form-control-feedback" *ngIf="errorMessage() !== null">{{errorMessage()}}</div>`
})
export class ValidationMessage {
  @Input() control: FormControl;
  constructor() { }

  errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}


