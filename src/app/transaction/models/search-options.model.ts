const DESC = 'DESC';
const ASC = 'ASC';

export class SearchOptions {
  transactions: any = [];
  page = 1;
  limit = 5;
  collectionSize = 0;
  sortBy = 'date';
  keyword = '';
  filter = '';
  sortDirection = DESC;

  getRecord(): Record<string, any> {
    return {
      offset: this.page - 1,
      sortBy: this.sortBy,
      keyword: this.keyword,
      filter: this.filter,
      limit: this.limit,
      sortDirection: this.sortDirection
    };
  }

  setSortBy(toSortBy: string) {
    if (toSortBy === this.sortBy) {
      if (DESC === this.sortDirection) {
        this.sortDirection = ASC;
      }
      else if (ASC === this.sortDirection) {
        this.sortDirection = DESC;
      }
    } else {
      this.sortBy = toSortBy;
      this.sortDirection = DESC;
    }
  }
}
