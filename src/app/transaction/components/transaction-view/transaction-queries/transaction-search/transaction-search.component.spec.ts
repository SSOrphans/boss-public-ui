import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionSearchComponent} from './transaction-search.component';
import {NgForm} from '@angular/forms';

describe('TransactionSearchComponent', () => {
  let component: TransactionSearchComponent;
  let fixture: ComponentFixture<TransactionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionSearchComponent, NgForm]
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
    component.keyword = 'test';
    component.onSearch();
    fixture.detectChanges();
    expect(component.searchEventFromSearchComponent.emit).toHaveBeenCalledWith('test');
  });


});
