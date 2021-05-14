import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionFilterComponent} from './transaction-filter.component';

describe('TransactionFilterComponent', () => {
  let component: TransactionFilterComponent;
  let fixture: ComponentFixture<TransactionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new filter', () => {
    spyOn(component.filterEventFromFilterComponent, 'emit');
    component.onFilter('test');
    fixture.detectChanges();
    expect(component.filterEventFromFilterComponent.emit).toHaveBeenCalledOnceWith('test');
  });

  it('should correctly return the filter by index', () => {
    let filter = '';
    filter = component.getFilter(1);
    expect(filter).toEqual('Deposit');

    filter = component.getFilter(2);
    expect(filter).toEqual('Withdrawal');

    filter = component.getFilter(3);
    expect(filter).toEqual('Transfer');

    filter = component.getFilter(4);
    expect(filter).toEqual('Payment');

    filter = component.getFilter(5);
    expect(filter).toEqual('Check');

    filter = component.getFilter(6);
    expect(filter).toEqual('Charge');

    filter = component.getFilter(7);
    expect(filter).toEqual('ATM');
  });
});
