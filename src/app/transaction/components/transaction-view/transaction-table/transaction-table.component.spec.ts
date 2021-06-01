import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TransactionTableComponent} from './transaction-table.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TransactionHttpService} from '../../../../shared/services/transaction-http.service';
import {ActivatedRoute} from '@angular/router';
import {SimpleChange} from '@angular/core';
import {of, throwError} from 'rxjs';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;
  let httpService: TransactionHttpService;
  let datePipe: DatePipe;
  let stubbedTransactions: any[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionTableComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        CommonModule,
        HttpClientModule
      ],
      providers:
        [
          TransactionHttpService,
          DatePipe,
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                queryParams: {keyword: 'keywordFromParent-test', page: 0},
                params: {id: 1}
              }
            }
          },
        ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TransactionTableComponent);
    httpService = TestBed.inject(TransactionHttpService);
    datePipe = TestBed.inject(DatePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stubbedTransactions = [{
      date: new Date().toDateString(),
      type: 'TestType',
      merchantName: 'TestMerchant',
      amount: 123.45,
      newBalance: 12345.67,
      pending: true
    }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find transactions', () => {
    let observableStubbedTransaction = of(stubbedTransactions);
    spyOn(httpService, 'findAllTransactions').and.returnValue(observableStubbedTransaction);
    const actualTransaction = httpService.findAllTransactions({id: '', httpQuery: ''});
    expect(httpService.findAllTransactions).toHaveBeenCalled();
    expect(actualTransaction).toEqual(observableStubbedTransaction);
  });

  it('should call transaction subscription', fakeAsync(() => {
    const findAllTransactionSpy = spyOn(httpService, 'findAllTransactions').and.returnValue(of(stubbedTransactions));
    const subSpy = spyOn(httpService.findAllTransactions({id: '', httpQuery: ''}), 'subscribe');
    component.loadTransactions();
    tick();
    expect(findAllTransactionSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should format the transaction', fakeAsync(() => {
    spyOn(httpService, 'findAllTransactions').and.returnValue(of({transactions: stubbedTransactions}));
    component.loadTransactions();
    fixture.detectChanges();
    expect(component.options.transactions).toBeDefined();
    expect(component.options.transactions).toEqual(stubbedTransactions);
  }));

  it('should change the value of keyword and filter', () => {
    const keywordToTableComponent = new SimpleChange(undefined, 'changeTest', false);
    const filterToTableComponent = new SimpleChange(undefined, 'changeTest', false);
    component.ngOnChanges({keywordToTableComponent, filterToTableComponent});
    fixture.detectChanges();
    expect(component.options.keyword).toEqual('changeTest');
    expect(component.options.filter).toEqual('changeTest');
  });

  it('should have changed sort value', () => {
    component.onSortChange('merchantName');
    fixture.detectChanges();
    expect(component.options.sortBy).toEqual('merchantName');
  });

  it('should load the transactions on page change', () => {
    const loadTransactionSpy = spyOn(component, 'loadTransactions');
    component.onPageChange();
    fixture.detectChanges();
    expect(loadTransactionSpy).toHaveBeenCalled();
  });

  it('should reinitialize page on httpService.findAllTransactions error', fakeAsync (() => {
    spyOn(httpService, 'findAllTransactions').and.returnValue(throwError({status: 404}));
    const initSpy = spyOn(component, 'ngOnInit');
    component.loadTransactions();
    tick();
    fixture.detectChanges();
    expect(component.options.page).toEqual(1);
    expect(component.options.sortBy).toEqual('date');
    expect(component.options.transactions).toEqual([]);
  }));

  it('should set the table limit', () => {
    component.onLimitChange(10);
    expect(component.options.limit).toEqual(10);
  })
});
