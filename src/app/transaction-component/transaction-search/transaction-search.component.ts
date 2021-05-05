import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.css']
})
export class TransactionSearchComponent implements OnInit {
  faSearch = faSearch;

  @Output() searchEventFromSearchComponent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearch(search: string): void {
    this.searchEventFromSearchComponent.emit(search);
  }


}
