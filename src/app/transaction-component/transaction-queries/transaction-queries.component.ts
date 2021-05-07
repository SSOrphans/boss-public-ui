import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-transaction-queries',
  templateUrl: './transaction-queries.component.html',
  styleUrls: ['./transaction-queries.component.css']
})
export class TransactionQueriesComponent implements OnInit {
  @Output() searchEventFromQueriesComponent = new EventEmitter<string>();
  @Output() filterEventFromQueriesComponent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(search: string): void {
    this.searchEventFromQueriesComponent.emit(search);
  }

  onFilter(filter: string): void {
    this.filterEventFromQueriesComponent.emit(filter);
  }

}
