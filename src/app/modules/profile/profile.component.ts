import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../../notification.service';
import { ValidationService } from '../../validation.service';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    loginForm : FormGroup;
    model: any = {};
    disabled = false;
    error = '';
    vs = ValidationService;
    
    constructor(private router: Router,private AuthService: AuthService,
            private notify:NotificationService,private fb:FormBuilder ) {
        this.loginForm = this.fb.group({
            email:['',[Validators.required,Validators.email]],
            password:['', Validators.required]
        });
    }
    ngOnInit() {}
    // login() {
    //     if(this.loginForm.invalid){
    //         return ;
    //     }
    //     this.disabled = true;
    //     this.model = this.loginForm.value;
    //     this.AuthService.login(this.model.email, this.model.password)
    //         .subscribe(result => {
    //             if (result) {
    //                 // login successful
    //                 this.notify.notifySuccess("Login successful.");
    //                 console.log(result);
    //                 //this.router.navigate(['/']);
    //             } else {
    //                 // login failed
    //                 this.error = 'Something Went Wrong.';
    //                 this.notify.notifyError(this.error);
    //                 this.disabled = false;
    //             }
    //         },error=>{
    //             this.error = "Invalid Credentials.";
    //             this.notify.notifyError(this.error);
    //             this.disabled = false;
    //         });
    // }
}
