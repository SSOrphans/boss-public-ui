import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { ProfileComponent } from '../profile.component';
import { of } from 'rxjs';

import { UpdateProfileComponent } from './update-profile.component';

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let form: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [UpdateProfileComponent, ProfileComponent],
      providers: [UserHttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    form = null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update profile', () => {
    form = component.updateForm.controls;
    form.email.setValue('email@ss.com');
    form.fullName.setValue('name');
    form.address.setValue('address');
    form.city.setValue('city');
    form.state.setValue('state');
    form.zip.setValue(12345);
    form.phone.setValue('18001234567');

    let userService = TestBed.inject(UserHttpService);
    spyOn(userService, 'updateProfile').and.callFake(() => {
      return of();
    });
    spyOn(component, 'updateProfile').and.callThrough();

    component.submitForm();
    expect(component.updateProfile).toHaveBeenCalled();
    expect(userService.updateProfile).toHaveBeenCalled();
  });

  it('invalid form', () => {
    form = component.updateForm.controls;

    expect(component.updateForm.invalid).toBeTruthy();
  });

  it('valid form', () => {
    form = component.updateForm.controls;
    form.email.setValue('email@ss.com');
    form.fullName.setValue('name');
    form.address.setValue('address');
    form.city.setValue('city');
    form.state.setValue('state');
    form.zip.setValue(12345);
    form.phone.setValue('18001234567');

    expect(component.updateForm.valid).toBeTruthy();
  });

  it('invalid email', () => {
    let email = component.updateForm.controls.email;

    email.setValue('email');
    expect(email.invalid).toBeTruthy();

    email.setValue('email@');
    expect(email.invalid).toBeTruthy();

    email.setValue('email@ss.');
    expect(email.invalid).toBeTruthy();
  });

  it('valid email', () => {
    let email = component.updateForm.controls.email;

    email.setValue('email@ss.com');
    expect(email.valid).toBeTruthy();
  });

  it('invalid name', () => {
    let name = component.updateForm.controls.fullName;

    name.setValue('!@#$');
    expect(name.invalid).toBeTruthy();
  });

  it('valid name', () => {
    let name = component.updateForm.controls.fullName;

    name.setValue('name');
    expect(name.valid).toBeTruthy();
  });

  it('invalid address', () => {
    let address = component.updateForm.controls.address;

    address.setValue('!@#$');
    expect(address.invalid).toBeTruthy();
  });

  it('valid address', () => {
    let address = component.updateForm.controls.address;

    address.setValue('address');
    expect(address.valid).toBeTruthy();
  });

  it('invalid city', () => {
    let city = component.updateForm.controls.city;

    city.setValue('!@#$');
    expect(city.invalid).toBeTruthy();
  });

  it('valid city', () => {
    let city = component.updateForm.controls.city;

    city.setValue('city');
    expect(city.valid).toBeTruthy();
  });

  it('invalid state', () => {
    let state = component.updateForm.controls.state;

    state.setValue('!@#$');
    expect(state.invalid).toBeTruthy();
  });

  it('valid state', () => {
    let state = component.updateForm.controls.state;

    state.setValue('state');
    expect(state.valid).toBeTruthy();
  });

  it('invalid zip', () => {
    let zip = component.updateForm.controls.zip;

    zip.setValue('!@#$');
    expect(zip.invalid).toBeTruthy();
  });

  it('valid zip', () => {
    let zip = component.updateForm.controls.zip;

    zip.setValue(12345);
    expect(zip.valid).toBeTruthy();
  });

  it('invalid phone', () => {
    let phone = component.updateForm.controls.phone;

    phone.setValue('!@#$');
    expect(phone.invalid).toBeTruthy();
  });

  it('valid phone', () => {
    let phone = component.updateForm.controls.phone;

    phone.setValue('12345');
    expect(phone.valid).toBeTruthy();
  });
});
