import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionViewComponent} from './transaction-view.component';
import {ActivatedRoute} from '@angular/router';

describe('TransactionViewComponent', () => {
  let component: TransactionViewComponent;
  let fixture: ComponentFixture<TransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionViewComponent],
      providers:
      [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              queryParams: {keyword: 'keywordFromParent-test', page: 0},
              params: {id: 1}
            }
          }
        },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update the keywordFromParent', () => {
    component.onSearch('test');
    fixture.detectChanges();
    expect(component.keywordFromParent).toEqual('test');
  });
  it('should update the filterFromParent', () => {
    component.onFilter('test');
    fixture.detectChanges();
    expect(component.filterFromParent).toEqual('test');
  });
});
