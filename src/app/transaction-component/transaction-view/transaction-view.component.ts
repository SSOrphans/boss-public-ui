import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  keywordFromParent: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearch(newSearch: string): void {
    this.keywordFromParent = newSearch;
  }

}
