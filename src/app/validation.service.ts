import { Injectable } from '@angular/core';
import { AbstractControl,FormGroup } from '@angular/forms';

@Injectable()
export class ValidationService {
    static getErrorMessage(validatorName: string, validatorValue?: any) {
        let messages = {
            'required': 'Required',
            'email':'Invalid Email',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'donotMatch':'Password & Confirm Password do not match.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };

        return messages[validatorName];
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static passwordConfirmValidator (ac){
        const fg = ac.parent;
        if(fg){
            if(fg.get('password').value !== ac.value){
                return {'donotMatch':true};
            }   
        }
        return null;
    }
    static getControlClass (control){
        for (let propertyName in control.errors) {
            if (control.errors.hasOwnProperty(propertyName) && control.touched) {
               return "form-control-danger";
            } 
        }
        if(control.touched){
                return "form-control-success";
        }
    }
    
    static getGroupClass (control){
        for (let propertyName in control.errors) {
            if (control.errors.hasOwnProperty(propertyName) && control.touched) {
                return "has-danger";
            }
        }
        if(control.touched){
            return "has-success";
        }
    }
}