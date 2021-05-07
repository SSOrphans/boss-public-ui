import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionSearchComponent} from './transaction-search.component';

describe('TransactionSearchComponent', () => {
  let component: TransactionSearchComponent;
  let fixture: ComponentFixture<TransactionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionSearchComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TransactionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new search to Query Component', () => {
    spyOn(component.searchEventFromSearchComponent, 'emit');
    component.onSearch('test');
    fixture.detectChanges();
    expect(component.searchEventFromSearchComponent.emit).toHaveBeenCalledOnceWith('test');
  });


});
