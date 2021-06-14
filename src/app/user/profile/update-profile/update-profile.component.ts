import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  emptyFormMsg?: string;
  requiredFieldMarker?: string;
  updateForm!: FormGroup;
  disableSubmitBtn: boolean = false;
  jwtDecoder: JwtHelperService;

  constructor(
    private userService: UserHttpService,
    private redirect: Router,
    private route: ActivatedRoute
  ) {
    this.jwtDecoder = new JwtHelperService();
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, [
        Validators.maxLength(64),
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      address: new FormControl(null, [
        Validators.maxLength(255),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9. ]+$'),
      ]),
      city: new FormControl(null, [
        Validators.maxLength(64),
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      state: new FormControl(null, [
        Validators.maxLength(32),
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      zip: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      phone: new FormControl(null, [
        Validators.maxLength(16),
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngDoCheck(): void {
    if (!localStorage.getItem('clientPass')) {
      this.redirect.navigate(['/home']);
    }
  }

  submitForm(): void {
    if (this.updateForm.invalid) {
      this.emptyFormMsg = 'Please fill out the form.';
      this.requiredFieldMarker = '*';
      return;
    }

    if (localStorage.getItem('clientPass')) {
      this.updateProfile();
    }
  }

  get userInput() {
    return this.updateForm.controls;
  }

  updateProfile() {
    this.disableSubmitBtn = true;
    this.updateForm.disable();
    this.userService
      .updateProfile(
        this.jwtDecoder.decodeToken(
          localStorage.getItem('clientPass')?.valueOf()
        ).userId,
        {
          email: this.userInput.email.value.toLowerCase(),
          fullName: this.userInput.fullName.value,
          address: this.userInput.address.value,
          city: this.userInput.city.value,
          state: this.userInput.state.value,
          zip: this.userInput.zip.value,
          phone: this.userInput.phone.value,
        }
      )
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        () => {
          this.redirect.navigate(['/profile'], { relativeTo: this.route });
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
