import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from 'src/app/shared/services/http.service';
import {DatePipe} from '@angular/common';
import {SearchOptions} from '../../../models/search-options.model';
import {
  faCashRegister,
  faCreditCard,
  faDonate,
  faExchangeAlt,
  faFileInvoiceDollar,
  faMoneyBillWave,
  faMoneyCheckAlt,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit, OnChanges {

  faSortDown = faSortDown;
  faSortUp = faSortUp;
  faMoneyBillWave = faMoneyBillWave;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faCreditCard = faCreditCard;
  faExchangeAlt = faExchangeAlt;
  faCashRegister = faCashRegister;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faDonate = faDonate;

  htmlSelect = 5;
  options = new SearchOptions();

  @Input() keywordToTableComponent: string | undefined;
  @Input() filterToTableComponent: string | undefined;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.options = new SearchOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.keywordToTableComponent && (changes.keywordToTableComponent.currentValue || changes.keywordToTableComponent.currentValue == ''))) {
      this.options.keyword = changes.keywordToTableComponent.currentValue;
    }
    if (changes.filterToTableComponent && changes.filterToTableComponent.currentValue) {
      this.options.filter = changes.filterToTableComponent.currentValue;
    }

    this.options.page = 1;
    this.loadTransactions();
  }

  onPageChange(): void {
    this.loadTransactions();
  }

  onLimitChange(limit: any): void {
    this.options.limit = limit;
    this.loadTransactions();
  }

  onSortChange(sort: string): void {
    this.options.setSortBy(sort);
    this.options.page = 1;
    this.loadTransactions();
  }

  loadTransactions(): void {
    const id = this.route.snapshot.params.id;
    const httpQuery = `?${new URLSearchParams(this.options.getRecord()).toString()}`;
    try {
      this.httpService.findAllTransactions({id, httpQuery})
        .subscribe((resp: any) => {
            const httpTransactions = resp.transactions;
            httpTransactions.forEach(
              (transaction: { date: Date | string | null }) => {
                transaction.date = this.datePipe.transform(transaction.date, 'MM-dd-yyyy');
              });
            this.options.transactions = httpTransactions;
            this.options.limit = resp.limit;
            this.options.collectionSize = resp.limit * resp.pages;
          },
          (error: any) => {
            this.options.page = 1;
            this.options.sortBy = 'date';
            this.options.transactions = [];
          });
    } catch (err) {
    }
  }

}
