import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Title} from '@angular/platform-browser';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Bank of Smoothstack'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Bank of Smoothstack');
  });

  it('should set the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const title = TestBed.inject(Title);
    fixture.detectChanges();
    expect(title.getTitle()).toBe('Bank of Smoothstack');
  });
});
