import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from 'src/app/shared/services/http.service';
import {DatePipe} from '@angular/common';
import {faSortDown, faMoneyBillWave, faMoneyCheckAlt, faCreditCard, faExchangeAlt, faCashRegister, faDonate} from '@fortawesome/free-solid-svg-icons';


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


  constructor(private route: ActivatedRoute, private httpService: HttpService, private datePipe: DatePipe) {
  }

  transactions: any = [];
  page = 1;
  limit = 5;
  collectionSize = 0;
  sort = 'date';
  keyword: string | undefined;
  filter: string | undefined;
  @Input() keywordToTableComponent: string | undefined;
  @Input() filterToTableComponent: string | undefined;

  ngOnInit(): void {
    this.transactions = [];
    this.page = 1;
    this.limit = 5;
    this.collectionSize = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.keyword = '';
    if (changes.keywordToTableComponent && changes.keywordToTableComponent.currentValue) {
      this.keyword = changes.keywordToTableComponent.currentValue;
    }
    if (changes.filterToTableComponent && changes.filterToTableComponent.currentValue) {
      this.filter = changes.filterToTableComponent.currentValue;
    }
    this.loadTransactions();
  }

  onPageChange(): void {
    this.loadTransactions();
  }

  onSortChange(sortIndex: number): void {
    switch (sortIndex) {
      case 0:
        this.sort = 'date';
        break;
      case 1:
        this.sort = 'merchantName';
        break;
      case 2:
        this.sort = 'amount';
        break;
      case 3:
        this.sort = 'newBalance';
        break;
      case 4:
        this.sort = 'pending';
        break;
      case 5:
        this.sort = 'type';
        break;
      default:
        this.sort = 'date';
        break;
    }
    this.page = 1;
    this.loadTransactions();
  }

  loadTransactions(): void {
    const id = this.route.snapshot.params.id;
    const keywordQuery = this.keyword ? 'keyword=' + this.keyword : '';
    const pageQuery = this.page ? 'offset=' + (this.page - 1) : '';
    const filterQuery = this.filter ? 'filter=' + this.filter : '';
    const sortQuery = this.sort ? 'sortBy=' + this.sort : 'date';
    const httpQuery = (keywordQuery || pageQuery || filterQuery || sortQuery) ?
      `?${keywordQuery}&${pageQuery}&${filterQuery}&${sortQuery}` : '';
    try {
      this.httpService.findAllTransactions(`/api/accounts/${id}/transactions${httpQuery}`)
        .subscribe((resp: any) => {
            const httpTransactions = resp.transactions;
            httpTransactions.forEach(
              (transaction: { date: Date | string | null }) => {
                transaction.date = this.datePipe.transform(transaction.date, 'MM-dd-yyyy');
              });
            this.transactions = httpTransactions;
            this.limit = resp.limit;
            this.page = resp.page;
            this.collectionSize = resp.limit * resp.pages;
          },
          (error: any) => {
            this.ngOnInit();
          });
    } catch (err) {
    }
  }

}
