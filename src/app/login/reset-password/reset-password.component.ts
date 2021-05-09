import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(
    private redirect: Router,
    private userService: UserHttpService,
    private route: ActivatedRoute
  ) {
    this.disableSubmitBtn = false;
    this.passwordForm = new FormGroup({
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
      if(param['tk']){
        this.token = param['tk'];
      }
      else{
        this.redirect.navigate(['home']);
      }
    });
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
    // TODO: AWS SNS; token is hardcoded for endpoint test
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
          this.redirect.navigate(['/home']);
        },
        (err: any) => {
          this.emptyFormMsg = err.error;
          // TODO: redirect to 404 not found
          this.disableSubmitBtn = false;
          this.passwordForm.markAsUntouched();
          this.passwordForm.enable();
        }
      );
  }
}
