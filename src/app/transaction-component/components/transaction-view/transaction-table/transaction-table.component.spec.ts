import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SimpleChange} from '@angular/core';
import {TransactionTableComponent} from './transaction-table.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;
  let httpService: HttpService;
  let stubbedTransactions: any[];
  let datePipe: DatePipe;

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
      providers: [HttpService, DatePipe, DatePipe, {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            queryParams: {keyword: 'keywordFromParent-test', page: 0},
            params: {id: 1}
          }
        }
      }
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TransactionTableComponent);
    httpService = TestBed.inject(HttpService);
    datePipe = TestBed.inject(DatePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stubbedTransactions = [{
      date: new Date().toDateString(),
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
    spyOn(httpService, 'findAllTransactions').and.returnValue(stubbedTransactions);
    const actualTransaction = httpService.findAllTransactions('');
    expect(httpService.findAllTransactions).toHaveBeenCalled();
    expect(actualTransaction).toEqual(stubbedTransactions);
  });

  it('should call transaction subscribe', fakeAsync(() => {
    const findAllTransactionSpy = spyOn(httpService, 'findAllTransactions').and.returnValue(of(stubbedTransactions));
    const subSpy = spyOn(httpService.findAllTransactions(''), 'subscribe');
    component.ngOnInit();
    tick();
    expect(findAllTransactionSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should format the transaction', fakeAsync(() => {
    spyOn(httpService, 'findAllTransactions').and.returnValue(of(stubbedTransactions));
    component.ngOnInit();
    expect(component.transactions).toBeDefined();
    expect(component.transactions).toEqual(stubbedTransactions);
  }));

  it('should change the value of keyword', () => {
    spyOn(httpService, 'findAllTransactions').and.returnValue(stubbedTransactions);
    const keywordToTableComponent = new SimpleChange(undefined, 'changeTest', false);
    component.ngOnChanges({keywordToTableComponent});
    fixture.detectChanges();
    expect(component.keyword).toEqual('changeTest');

  });

  it('should change the value of keyword', () => {
    spyOn(httpService, 'findAllTransactions').and.returnValue(stubbedTransactions);
    const filterToTableComponent = new SimpleChange(undefined, 'changeTest', false);
    component.ngOnChanges({filterToTableComponent});
    fixture.detectChanges();
    expect(component.filter).toEqual('changeTest');

  });
});
