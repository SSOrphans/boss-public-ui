import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHttpService } from '../shared/services/user-http.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  localStorage.setItem(
    'clientPass',
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiJ0ZXN0LXN1YiIsInVzZXJJZCI6IjEiLCJ1c2VybmFtZSI6InVzZXItdGVzdCJ9.' +
      'o652LJ9eVSaHG5YxtqGyXYv0-31WB6HZMOcEb7ghE8qqzI9s9nxGULjXNIQmlnBhwPL68fbsdyyWg2XpZQtQeA'
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers: [UserHttpService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
