import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TransactionTableComponent} from './transaction-table.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../../shared/services/http.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {SearchOptions} from '../../../models/search-options.model';
import {SimpleChange} from '@angular/core';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;
  let httpService: HttpService;
  let datePipe: DatePipe;
  let searchOptions: SearchOptions;
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
          HttpService,
          DatePipe,
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                queryParams: {keyword: 'keywordFromParent-test', page: 0},
                params: {id: 1}
              }
            }
          },
          {
            provide: SearchOptions, useClass: SearchOptions
          },
        ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TransactionTableComponent);
    httpService = TestBed.inject(HttpService);
    datePipe = TestBed.inject(DatePipe);
    searchOptions = TestBed.inject(SearchOptions);
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
    expect(searchOptions.transactions).toBeDefined();
    expect(searchOptions.transactions).toEqual(stubbedTransactions);
  }));

  it('should change the value of keyword and filter', () => {
    spyOn(httpService, 'findAllTransactions').and.returnValue(of(stubbedTransactions));
    const keywordToTableComponent = new SimpleChange(undefined, 'changeTest', false);
    const filterToTableComponent = new SimpleChange(undefined, 'changeTest', false);
    component.ngOnChanges({keywordToTableComponent, filterToTableComponent});
    fixture.detectChanges();
    expect(searchOptions.keyword).toEqual('changeTest');
    expect(searchOptions.filter).toEqual('changeTest');

  });
});
