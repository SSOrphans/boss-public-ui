import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.css']
})
export class TransactionSearchComponent implements OnInit {
  @Output() searchEventFromSearchComponent = new EventEmitter<string>();
  @Input() keyword: string = '';
  faSearch = faSearch;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.searchEventFromSearchComponent.emit(this.keyword);
  }
}
