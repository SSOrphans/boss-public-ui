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
    expect(model.keyword).toEqual( '');
    expect(model.filter).toEqual( '');
  });

  it('should change value of sortBy from setSortBy', () => {
    model.setSortBy('testSort');
    expect(model.sortBy).toEqual('testSort')
  });

  it('should return a record of options', () => {
    const aRecord = model.getRecord();
    expect(aRecord).toEqual(
      {
        offset: 0,
        sortBy: 'date',
        keyword: '',
        filter: ''
      }
    )
  })

});
