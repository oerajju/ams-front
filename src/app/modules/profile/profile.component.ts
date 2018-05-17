import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';
import { ProfileService } from './profile.service';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    cpForm: FormGroup;
    model: any = {};
    disabled = false;
    error = '';
    vs = ValidationService;
    profileData: any ={};

    constructor(private notify: NotificationService, private fb: FormBuilder, private PS: ProfileService) {
        this.cpForm = this.fb.group({
            oldpassword: ['', [Validators.required]],
            password: ['', Validators.required],
             password_confirmation: ['', [Validators.required, this.vs.passwordConfirmValidator]]
        });
    }
    ngOnInit() {
        this.getProfileDtail();

      }

    getProfileDtail(){
        
        this.PS.getEmployeeInfoByUserId().subscribe((result: any) => {
            this.profileData = result;
          //  console.log(this.profileData);
        });
    }
    submitform(){
        this.PS.changePassword(this.cpForm.value).subscribe(
                result => {
                    if(result.message){
                    this.notify.notifySuccess(result.message);
                    this.cpForm.reset();
                    }else
                    {
                     this.notify.notifyError(result.error);
                    }

                    },
                error => {
                    this.notify.notifyError(error.message);
                }
            );
    }
}
