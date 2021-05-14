import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFilterComponent } from './transaction-filter.component';

describe('TransactionFilterComponent', () => {
  let component: TransactionFilterComponent;
  let fixture: ComponentFixture<TransactionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionFilterComponent ]
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
});
