import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let form: any;
  let email: any;
  let invalidEmail: any;
  let validEmail: any;
  let userService: UserHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ForgotPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserHttpService);
    form = component.resetForm;
    email = component.resetForm.controls.email;
    validEmail = 'email@ss.com';
    invalidEmail = 'email@';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit form', () => {
    let spyUserService = spyOn(userService, 'forgotPass').and.callThrough();
    let spyResetLink = spyOn(component, 'sendResetLink').and.callThrough();
    email.setValue(validEmail);
    component.submitForm();
    expect(component.userInput.email.value).toContain(validEmail);
    expect(spyResetLink).toHaveBeenCalledBefore(spyUserService);
    expect(spyUserService).toHaveBeenCalled();
    expect(component.disableSubmitBtn).toBeTrue();
    expect(form.disabled).toBeTrue();
  });

  it('valid email', () => {
    email.setValue(validEmail);
    expect(email.valid).toBeTruthy();
  });

  it('invalid email', () => {
    email.setValue(invalidEmail);
    expect(email.invalid).toBeTruthy();
  });

  it('valid form', () => {
    email.setValue(validEmail);
    expect(form.valid).toBeTruthy();
  });

  it('invalid form', () => {
    expect(form.invalid).toBeTruthy();
  });
});
