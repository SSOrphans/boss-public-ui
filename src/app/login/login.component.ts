import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { UserHttpService } from '../shared/services/user-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emptyFormMsg?: string;
  requiredMarker?: string;
  loginForm!: FormGroup;
  disableSubmitBtn = false;

  constructor(
    private userService: UserHttpService,
    private redirect: Router
  ) {}

  ngDoCheck(): void {
    if (localStorage.getItem('clientPass')) {
      this.redirect.navigate(['/accounts']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
        Validators.pattern('^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'
        ),
      ]),
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.emptyFormMsg = 'Please fill out the form.';
      this.requiredMarker = '*';
      return;
    }

    this.loginUser();
  }

  get userDetails(): any {
    return this.loginForm.controls;
  }

  captureResult(result: any): void {
    // Cache JWT to client.
    localStorage.setItem('clientPass', result['token']);
  }

  loginUser(): void {
    // Perform request.
    this.userService
      .loginUser({
        username: this.userDetails.username.value,
        password: this.userDetails.password.value,
      })
      .pipe(
        take(1),
        catchError((err) => throwError(err))
      )
      .subscribe(
        (result) => this.captureResult(result),
        (err: any) => {
          this.disableSubmitBtn = false;
          this.loginForm.markAsUntouched();
          this.loginForm.enable();

          // let testJWT = {
          //   token:
          //     'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.' +
          //     'eyJzdWIiOiJ0ZXN0LXN1YiIsInVzZXJJZCI6IjEiLCJ1c2VybmFtZSI6InVzZXItdGVzdCJ9.' +
          //     'o652LJ9eVSaHG5YxtqGyXYv0-31WB6HZMOcEb7ghE8qqzI9s9nxGULjXNIQmlnBhwPL68fbsdyyWg2XpZQtQeA',
          // };
          // this.captureResult(testJWT);
        }
      );
  }
}
