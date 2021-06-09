import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  disableSubmitBtn: boolean;
  requiredFieldMarker?: string;
  emptyFormMsg?: string;
  isResetComplete: boolean;
  hasError?: boolean;

  constructor(private userService: UserHttpService) {
    this.isResetComplete = false;
    this.disableSubmitBtn = false;
    this.hasError = false;
    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  get userInput(): any {
    return this.resetForm.controls;
  }
  submitForm() {
    if (this.resetForm.invalid) {
      this.emptyFormMsg = 'Please fill out the form.';
      this.requiredFieldMarker = '*';
      return;
    }
    this.sendResetLink();
  }

  sendResetLink(): void {
    this.disableSubmitBtn = true;
    this.resetForm.disable();
    this.userService
      .forgotPass({
        email: this.userInput.email.value.toLowerCase(),
      })
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        () => {
          this.isResetComplete = true;
        },
        (err) => {
          this.hasError = true;
          console.log(err);
        }
      );
  }
}
