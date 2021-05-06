import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create new user', () => {
    let userService = TestBed.inject(UserHttpService);
    spyOn(userService, 'registerUser').and.callFake(() => {
      return of();
    });

    let form = component.registerForm.controls;
    form.username.setValue('user1234');
    form.email.setValue('user1234@ss.com');
    form.password.setValue('USer!@34');

    component.createUser();
    expect(userService.registerUser).toHaveBeenCalled();
  });

  it('create user registration component', () => {
    expect(component).toBeTruthy();
  });

  it('invalid form', () => {
    let form = component.registerForm.controls;

    form.username.setValue('');
    form.email.setValue('');
    form.password.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('valid form', () => {
    let form = component.registerForm.controls;

    form.username.setValue('user1234');
    form.email.setValue('user1234@ss.com');
    form.password.setValue('USer!@34');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('valid username', () => {
    let username = component.registerForm.controls.username;

    username.setValue('user1234');
    expect(username.valid).toBeTruthy();

    username.setValue('user-1234');
    expect(username.valid).toBeTruthy();

    username.setValue('user_1234');
    expect(username.valid).toBeTruthy();

    username.setValue('user');
    expect(username.valid).toBeTruthy();
  });

  it('invalid username', () => {
    let username = component.registerForm.controls.username;

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();

    username.setValue('u');
    expect(username.hasError('minlength')).toBeTruthy();

    username.setValue('usernametoolong123456789');
    expect(username.hasError('maxlength')).toBeTruthy();

    // can't start with number
    username.setValue('1user');
    expect(username.hasError('pattern')).toBeTruthy();

    // can't end with dash
    username.setValue('user1234-');
    expect(username.hasError('pattern')).toBeTruthy();

    // can't end with underscore
    username.setValue('user1234_');
    expect(username.hasError('pattern')).toBeTruthy();

    // invalid characters
    username.setValue('user 1234');
    expect(username.hasError('pattern')).toBeTruthy();
  });

  it('valid email', () => {
    let email = component.registerForm.controls.email;

    email.setValue('user1234@ss.com');
    expect(email.valid).toBeTruthy();
  });

  it('invalid email', () => {
    let email = component.registerForm.controls.email;

    email.setValue('user1234@ss.');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('user1234@');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('user1234');
    expect(email.hasError('email')).toBeTruthy();
  });

  it('valid password', () => {
    let password = component.registerForm.controls.password;

    password.setValue('Pass!234');
    expect(password.valid).toBeTruthy();
  });

  it('invalid password', () => {
    let password = component.registerForm.controls.password;

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('pass');
    expect(password.hasError('minlength')).toBeTruthy();

    password.setValue(
      'Password!234 is too--------------------------------------------------------long'
    );
    expect(password.hasError('maxlength')).toBeTruthy();

    // at least 1 upper
    password.setValue('pass!234');
    expect(password.hasError('pattern')).toBeTruthy();

    // at least 1 lower
    password.setValue('PASS!234');
    expect(password.hasError('pattern')).toBeTruthy();

    // at least 1 special character
    password.setValue('Pass1234');
    expect(password.hasError('pattern')).toBeTruthy();

    // at least 1 number
    password.setValue('Pass!@#$');
    expect(password.hasError('pattern')).toBeTruthy();
  });
});
