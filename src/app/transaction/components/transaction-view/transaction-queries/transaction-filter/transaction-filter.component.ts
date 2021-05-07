import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.css']
})
export class TransactionFilterComponent implements OnInit {
  faFilter = faFilter;

  @Output() filterEventFromFilterComponent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onFilter(filter: string): void {
    this.filterEventFromFilterComponent.emit(filter);
  }
}
