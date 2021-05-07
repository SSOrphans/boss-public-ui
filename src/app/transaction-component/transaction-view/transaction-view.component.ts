import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  keywordFromParent: string | undefined;
  filterFromParent: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearch(newSearch: string): void {
    this.keywordFromParent = newSearch;
  }

  onFilter(newFilter: string): void {
    this.filterFromParent = newFilter;
  }

}
