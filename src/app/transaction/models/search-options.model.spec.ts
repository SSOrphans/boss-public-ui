import { TestBed } from '@angular/core/testing';
import {SearchOptions} from './search-options.model';


describe('SearchOptions Model', () => {
  let model: SearchOptions;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchOptions],
    }).compileComponents();
    model = new SearchOptions();
  });

  it('should create a model', () => {
    expect(model).toBeTruthy();
  });

  it('should initialize model values', () => {
    expect(model.transactions).toEqual([]);
    expect(model.page).toEqual( 1);
    expect(model.limit).toEqual( 5);
    expect(model.collectionSize).toEqual( 0);
    expect(model.sortBy).toEqual( 'date');
    expect(model.keyword).toEqual( undefined);
    expect(model.filter).toEqual( undefined);
  });

  it('should change value of sortBy from setSortBy', () => {
    model.setSortBy(0);
    expect(model.sortBy).toEqual('date')
    model.setSortBy(1);
    expect(model.sortBy).toEqual('merchantName')
    model.setSortBy(2);
    expect(model.sortBy).toEqual('amount')
    model.setSortBy(3);
    expect(model.sortBy).toEqual('newBalance')
    model.setSortBy(4);
    expect(model.sortBy).toEqual('pending')
    model.setSortBy(5);
    expect(model.sortBy).toEqual('type')
    model.setSortBy(999);
    expect(model.sortBy).toEqual('date')
  });

});
