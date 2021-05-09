import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchOptions {
  transactions: any = [];
  offset = 1;
  limit = 5;
  collectionSize = 0;
  sortBy = 'date';
  keyword?: string;
  filter?: string;

  getRecord(): Record<string, any> {
    return {
      transactions: this.transactions,
      page: this.offset,
      limit: this.limit,
      collectionSize: this.collectionSize,
      sort: this.sortBy,
      keyword: this.keyword,
      filter: this.filter
    };
  }

  setSortBy(sortIndex: number) {
    switch (sortIndex) {
      case 0:
        this.sortBy = 'date';
        break;
      case 1:
        this.sortBy = 'merchantName';
        break;
      case 2:
        this.sortBy = 'amount';
        break;
      case 3:
        this.sortBy = 'newBalance';
        break;
      case 4:
        this.sortBy = 'pending';
        break;
      case 5:
        this.sortBy = 'type';
        break;
      default:
        this.sortBy = 'date';
        break;
    }
  }
}
