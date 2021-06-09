import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHttpService } from '../../shared/services/user-http.service';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  emptyFormMsg?: string;
  requiredFieldMarker?: string;
  registerForm!: FormGroup;
  disableSubmitBtn = false;
  hasError = false;

  constructor(private userService: UserHttpService, private redirect: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
        // cannot start with a number or only contain numbers
        Validators.pattern('^[a-zA-Z]+([_-]?[a-zA-Z0-9])*$'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        // must at least have 1 lower, upper, number, and special character
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'
        ),
      ]),
    });
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.emptyFormMsg = 'Please fill out the form.';
      this.requiredFieldMarker = '*';
      return;
    }
    this.createUser();
  }

  get userInput(): any {
    return this.registerForm.controls;
  }

  createUser(): void {
    this.disableSubmitBtn = true;
    this.registerForm.disable();
    this.userService
      .registerUser({
        username: this.userInput.username.value.toLowerCase(),
        email: this.userInput.email.value.toLowerCase(),
        password: this.userInput.password.value,
      })
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        () => {
          this.redirect.navigate(['/login']);
        },
        (err: any) => {
          if (err.status === 409) {
            this.emptyFormMsg = err.error + '.';
          } else {
            // TODO: redirect to 404 not found
          }
          this.hasError = true;
          this.disableSubmitBtn = false;
          this.registerForm.markAsUntouched();
          this.registerForm.enable();
        }
      );
  }
}
