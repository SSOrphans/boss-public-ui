import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionViewComponent } from './account-transaction-view.component';

describe('AccountTransactionViewComponent', () => {
  let component: AccountTransactionViewComponent;
  let fixture: ComponentFixture<AccountTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTransactionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
