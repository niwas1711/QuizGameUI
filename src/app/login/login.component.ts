import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {  MatDialogRef } from '@angular/material/dialog';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  signinForm: FormGroup;
  forgotPasswordForm: FormGroup;
  returnUrl: string;
  loading = false;
  error = '';

  mode: SignInMode;
  get f() { return this.signinForm.controls; }
  get g() { return this.signupForm.controls; }
  

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>) { 
    this.mode = SignInMode.signIn;
   
  }

  onSigninSubmit() {
    console.log("signin submit");
    this.dialogRef.close({email: this.f.email.value,password: this.f.password.value});
   /* this.authService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        console.log("signin", data);
        this.dialogRef.close();
        this.router.navigate(['/dashboard']);
    },
    error => {
      this.error = error;
      this.loading = false;
  });*/
  }

  //register
  onSignupSubmit() {
    console.log(this.g.email.value, this.g.username.value, this.g.password.value);
    this.authService.register(this.g.email.value, this.g.username.value, this.g.password.value, "user").pipe(first()).subscribe(
      data => {
        this.dialogRef.close({email: this.g.email.value,password: this.g.password.value});
        this.router.navigate(['/dashboard']);
    },
    error => {
      this.error = error;
      console.log("error in login", error);
      this.router.navigate(['/login']);
      this.loading = false;
  });
  }

  //forgot password
  onForgotPasswordSubmit() {
    console.log("forgot pwd submit");
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );

    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: signupFormValidator}
    );

    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
      }
    );
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}

function signupFormValidator(fg: FormGroup): {[key: string]: boolean} {
  //TODO: check if email is already taken

  //Password match validation
  if (fg.get('password').value !== fg.get('confirmPassword').value)
    return {'passwordmismatch': true}

  return null;
}

export enum SignInMode {
  signIn,
  signUp,
  forgotPassword
}
