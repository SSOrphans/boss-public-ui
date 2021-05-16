import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LoanTableComponent } from './loan-table.component';
import { SortEvent } from '../directives/sortable-header.directive';
import { LoanService } from 'src/app/shared/services/loan-http.service';

describe('LoanTableComponent', () => {
  let component: LoanTableComponent;
  let fixture: ComponentFixture<LoanTableComponent>;
  const testLoansA: any = {
    content: [
      {
        id: 0,
        loanNumber: '1234567890',
        branchId: 1,
        userId: 1,
        amount: '50000',
        amountDue: '1000',
        interestRate: '0.1',
        takenAt: '2020-01-01',
        dueBy: '2020-01-01',
        loanType: 'LOAN_PERSONAL',
      },
    ],
  };

  const testLoansE: any = [
    {
      id: 0,
      loanNumber: '1234567890',
      branchId: 1,
      userId: 1,
      amount: '50000',
      amountDue: '1000',
      interestRate: '0.1',
      takenAt: '2020-01-01',
      dueBy: '2020-01-01',
      loanType: 'Personal',
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoanTableComponent],
      providers: [LoanService],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init loans', () => {
    let loanService = TestBed.inject(LoanService);
    spyOn(loanService, 'getUserLoans').and.callFake(() => {
      return of(testLoansA);
    });
    component.ngOnInit();
    fixture.detectChanges();
    let loansA = component.loans;
    expect(loansA).toEqual(testLoansE);
    expect(loanService.getUserLoans).toHaveBeenCalled();
  });

  it('should sort loans', () => {
    spyOn(component, 'initLoans');
    let sortEvent: SortEvent = { column: 'id', direction: 'desc' };

    component.onSort(sortEvent);

    expect(component.sortInfo.direction).toEqual(sortEvent.direction);
    expect(component.sortInfo.sort).toEqual(sortEvent.column);
    expect(component.initLoans).toHaveBeenCalled();
  });

  it('should search loans', fakeAsync(() => {
    spyOn(component, 'initLoans');
    let searchValue = '1234';
    component.filter.setValue(searchValue);

    expect(component.sortInfo.keyword).toEqual(searchValue);
    expect(component.initLoans).toHaveBeenCalled();
  }));
});