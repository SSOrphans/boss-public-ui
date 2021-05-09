import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserHttpService } from 'src/app/shared/services/user-http.service';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let form: any;
  let password: any;
  let validPassword: any;
  let invalidPassword: any;
  let userService: UserHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ResetPasswordComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              tk: 'sometoken',
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserHttpService);
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    form = component.passwordForm;
    password = component.passwordForm.controls.password;
    validPassword = 'TEst!@34';
    invalidPassword = 'test1234';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit form', () => {
    let spyUserService = spyOn(userService, 'resetPass').and.callThrough();
    let spyUpdatePassword = spyOn(
      component,
      'updatePassword'
    ).and.callThrough();
    password.setValue(validPassword);
    component.submitForm();

    expect(component.token).toEqual('sometoken');
    expect(component.userInput.password.value).toContain(validPassword);
    expect(spyUpdatePassword).toHaveBeenCalledBefore(spyUserService);
    expect(spyUserService).toHaveBeenCalled();
    expect(component.disableSubmitBtn).toBeTrue();
    expect(form.disabled).toBeTrue();
  });

  it('token exists', () => {
    expect(component.token).toBeTruthy();
  });

  it('valid password', () => {
    password.setValue(validPassword);
    expect(password.valid).toBeTruthy();
  });

  it('invalid password', () => {
    password.setValue(invalidPassword);
    expect(password.invalid).toBeTruthy();
  });

  it('valid form', () => {
    password.setValue(validPassword);
    expect(form.valid).toBeTruthy();
  });

  it('invalid form', () => {
    expect(form.invalid).toBeTruthy();
  });
});
