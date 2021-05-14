import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountsViewComponent} from './accounts-view.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

describe('AccountsViewComponent', () => {
  let component: AccountsViewComponent;
  let fixture: ComponentFixture<AccountsViewComponent>;
  let stubbedAccount: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsViewComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        CommonModule,
        HttpClientModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AccountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stubbedAccount = {
      name: 'test',
      balance: '999.99',
      type: 'ACCOUNT_TEST'
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign account detail attributes', () => {
    component.setAccountAttributes(stubbedAccount);
    expect(component.name).toEqual('test');
    expect(component.balance).toEqual('999.99');
    expect(component.type).toEqual('TEST');
  });
});
