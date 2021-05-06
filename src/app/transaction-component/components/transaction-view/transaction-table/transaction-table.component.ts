import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from 'src/app/transaction-component/services/http.service';
import {DatePipe} from '@angular/common';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit, OnChanges {

  faSortDown = faSortDown;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private datePipe: DatePipe) {
  }

  transactions: any = [];
  page = 0;
  limit = 5;
  collectionSize = 0;
  keyword: string | undefined;
  filter: string | undefined;
  @Input() keywordToTableComponent: string | undefined;
  @Input() filterToTableComponent: string | undefined;

  ngOnInit(): void {
    this.initializeTransactions();
    this.loadTransactions();
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

  onPageChange(page: number): void {
    this.page = page - 1;
    this.loadTransactions();
  }

  loadTransactions(): void {
    const id = this.route.snapshot.params.id;
    const keywordQuery = this.keyword ? 'keyword=' + this.keyword : '';
    const pageQuery = this.page ? 'offset=' + this.page : '';
    const filterQuery = this.filter ? 'filter=' + this.filter : '';
    const httpQuery = (keywordQuery || pageQuery || filterQuery) ? `?${keywordQuery}&${pageQuery}&${filterQuery}` : '';
    try {
      this.httpService.findAllTransactions(`/api/accounts/${id}/transactions${httpQuery}`)
        .subscribe((resp: any) => {
            const httpTransactions = resp.transactions;
            httpTransactions.forEach((transaction: { date: Date | string | null }) => {
              transaction.date = this.datePipe.transform(transaction.date, 'MM-dd-yyyy');
            });
            this.transactions = httpTransactions;
            this.limit = resp.limit;
            this.page = resp.page;
            this.collectionSize = resp.limit * resp.pages;
          },
          (error: any) => {
            this.initializeTransactions();
          });
    } catch (err) {
    }
  }

  initializeTransactions(): void {
    this.transactions = [];
    this.page = 0;
    this.limit = 5;
    this.collectionSize = 0;
  }

  sort(sortBy: string): void {
    console.log(sortBy);
  }

}
