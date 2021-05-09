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
  faMoneyBillWave,
  faMoneyCheckAlt,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit, OnChanges {

  faSortDown = faSortDown;
  faMoneyBillWave = faMoneyBillWave;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faCreditCard = faCreditCard;
  faExchangeAlt = faExchangeAlt;
  faCashRegister = faCashRegister;
  faDonate = faDonate;


  @Input() keywordToTableComponent: string | undefined;
  @Input() filterToTableComponent: string | undefined;

  constructor(private options: SearchOptions, private route: ActivatedRoute, private httpService: HttpService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options.keyword = '';
    if (changes.keywordToTableComponent && changes.keywordToTableComponent.currentValue) {
      this.options.keyword = changes.keywordToTableComponent.currentValue;
      this.options.offset = 1;
    }
    if (changes.filterToTableComponent && changes.filterToTableComponent.currentValue) {
      this.options.filter = changes.filterToTableComponent.currentValue;
      this.options.offset = 1;
    }
    this.loadTransactions();
  }

  onPageChange(): void {
    this.loadTransactions();
  }

  onSortChange(sortIndex: number): void {
    this.options.setSortBy(sortIndex);
    this.options.offset = 1;
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
            this.ngOnInit();
          });
    } catch (err) {
    }
  }

}
