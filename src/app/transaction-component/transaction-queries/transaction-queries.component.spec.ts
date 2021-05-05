import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionQueriesComponent } from './transaction-queries.component';

describe('TransactionQueriesComponent', () => {
  let component: TransactionQueriesComponent;
  let fixture: ComponentFixture<TransactionQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
