import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.css']
})
export class TransactionSearchComponent implements OnInit {
  faSearch = faSearch;

  @Output() searchEventFromSearchComponent = new EventEmitter<string>();
  @ViewChild("newSearch") search! : NgForm;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.searchEventFromSearchComponent.emit(this.search.form.value.search);
  }
}
