import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AccountsListComponent} from './accounts-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AccountHttpService} from '../../../shared/services/account-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';

describe('AccountsListComponent', () => {
  let component: AccountsListComponent;
  let fixture: ComponentFixture<AccountsListComponent>;
  let httpService: AccountHttpService;
  let stubbedCheckingAccounts: any;
  let stubbedSavingsAccounts: any;
  let stubbedAccounts: any[];
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsListComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        CommonModule,
        HttpClientModule
      ],
      providers:
        [
          AccountHttpService,
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                params: {id: 1}
              }
            }
          },
          {provide: Router, useValue: routerSpy}
        ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(AccountsListComponent);
    httpService = TestBed.inject(AccountHttpService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stubbedCheckingAccounts = {
      id: 1,
      name: 'test checking account',
      balance: 999.99,
      type: component.CHECKING_ACCOUNTS
    };
    stubbedSavingsAccounts = {
      id: 2,
      name: 'test savings account',
      balance: 99.99,
      type: component.SAVING_ACCOUNTS
    };
    stubbedAccounts = [stubbedSavingsAccounts, stubbedCheckingAccounts];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find account', () => {
    let observableStubbedAccounts = of(stubbedAccounts);
    spyOn(httpService, 'getAccounts').and.returnValue(observableStubbedAccounts);
    const actualTransaction = httpService.getAccounts(1);
    expect(httpService.getAccounts).toHaveBeenCalled();
    expect(actualTransaction).toEqual(observableStubbedAccounts);
  });

  it('should call find account subscription', fakeAsync(() => {
    const getAccountsSpy = spyOn(httpService, 'getAccounts').and.returnValue(of(stubbedAccounts));
    const subSpy = spyOn(httpService.getAccounts(1), 'subscribe');
    component.loadAccounts();
    tick();
    expect(getAccountsSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should call group accounts method', fakeAsync(() => {
    spyOn(httpService, 'getAccounts').and.returnValue(of(stubbedAccounts));
    const groupAccountSpy = spyOn(component, 'groupAccounts');
    component.loadAccounts();
    fixture.detectChanges();
    expect(groupAccountSpy).toHaveBeenCalled();
  }));

  it('should group accounts', fakeAsync(() => {
    const expectedCheckingAccount = [stubbedCheckingAccounts];
    const expectedSavingsAccount = [stubbedSavingsAccounts];
    component.groupAccounts({accounts: stubbedAccounts});
    fixture.detectChanges();
    expect(component.savingAccount).toEqual(expectedSavingsAccount);
    expect(component.checkingAccount).toEqual(expectedCheckingAccount);
  }));

  it('should call router navigate', () => {
    component.onAccountSelect(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['accounts/1']);
  });
});
