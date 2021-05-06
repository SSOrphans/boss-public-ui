import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionQueriesComponent} from './transaction-queries.component';

describe('TransactionQueriesComponent', () => {
  let component: TransactionQueriesComponent;
  let fixture: ComponentFixture<TransactionQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionQueriesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new search to View Component', () => {
    spyOn(component.searchEventFromQueriesComponent, 'emit');
    component.onSearch('test');
    fixture.detectChanges();
    expect(component.searchEventFromQueriesComponent.emit).toHaveBeenCalledOnceWith('test');
  });

  it('should emit new filter to View Component', () => {
    spyOn(component.filterEventFromQueriesComponent, 'emit');
    component.onFilter('test');
    fixture.detectChanges();
    expect(component.filterEventFromQueriesComponent.emit).toHaveBeenCalledOnceWith('test');
  });
});
