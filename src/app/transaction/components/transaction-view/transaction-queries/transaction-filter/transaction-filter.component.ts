import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.css']
})
export class TransactionFilterComponent implements OnInit {
  faFilter = faFilter;
  selectedFilter = 'No Filter';
  @Output() filterEventFromFilterComponent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onFilter(filter: string): void {
    this.filterEventFromFilterComponent.emit(filter);
    this.selectedFilter = this.getFilter(+filter);
  }

  getFilter(filterIndex: number): string {
    switch(filterIndex){
      case 1: return 'Deposit';
      case 2: return 'Withdrawal';
      case 3: return 'Transfer';
      case 4: return 'Payment';
      case 5: return 'Check';
      case 6: return 'Charge';
      case 7: return 'ATM';
      default: return 'No Filter'
    }
  }
}
