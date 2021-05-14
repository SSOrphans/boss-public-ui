import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  keywordFromParent: string | undefined;
  filterFromParent: string | undefined;
  accountId: string | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params.id;
  }

  onSearch(newSearch: string): void {
    this.keywordFromParent = newSearch;
  }

  onFilter(newFilter: string): void {
    this.filterFromParent = newFilter;
  }

}
