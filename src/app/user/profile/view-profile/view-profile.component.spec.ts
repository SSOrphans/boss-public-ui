import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { ProfileComponent } from '../profile.component';
import { ViewProfileComponent } from './view-profile.component';
import { of } from 'rxjs';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ViewProfileComponent, ProfileComponent],
      providers: [UserHttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call user service', () => {
    let userService = TestBed.inject(UserHttpService);
    spyOn(userService, 'getUserProfileInfo').and.callFake(() => {
      return of();
    });

    component.ngAfterContentInit();
    expect(userService.getUserProfileInfo).toHaveBeenCalled();
  });

  it('redirect to update profile', () => {
    let redirect = TestBed.inject(Router);
    let route = TestBed.inject(ActivatedRoute);
    spyOn(redirect, 'navigate');

    component.onUpdate();
    expect(redirect.navigate).toHaveBeenCalledWith(
      ['update'],
      Object({ relativeTo: route })
    );
  });
});
