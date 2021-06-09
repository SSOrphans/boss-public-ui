import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  disableSubmitBtn: boolean;
  requiredFieldMarker?: string;
  emptyFormMsg?: string;
  token?: string;
  hasError?: boolean;

  constructor(
    private redirect: Router,
    private userService: UserHttpService,
    private route: ActivatedRoute
  ) {
    this.disableSubmitBtn = false;
    this.hasError = false;
    this.passwordForm = new FormGroup(
      {
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          // must at least have 1 lower, upper, number, and special character
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'
          ),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          // must at least have 1 lower, upper, number, and special character
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'
          ),
        ]),
      },
      { validators: passwordSameValidation }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => (this.token = params['token'])
    );
  }

  get userInput(): any {
    return this.passwordForm.controls;
  }

  submitForm() {
    if (this.passwordForm.invalid) {
      this.emptyFormMsg = 'Please fill out the form.';
      this.requiredFieldMarker = '*';
      return;
    }
    this.updatePassword();
  }

  updatePassword() {
    this.disableSubmitBtn = true;
    this.passwordForm.disable();
    this.userService
      .resetPass({
        token: this.token,
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
          this.emptyFormMsg = err.error;
          this.hasError = true;
          this.disableSubmitBtn = false;
          this.passwordForm.markAsUntouched();
          this.passwordForm.enable();
        }
      );
  }
}
export const passwordSameValidation: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');

  return password && confirm && password.value === confirm.value
    ? { passwordSame: true }
    : null;
};
