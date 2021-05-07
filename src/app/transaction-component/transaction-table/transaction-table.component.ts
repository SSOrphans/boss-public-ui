import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from 'src/app/shared/services/http.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit, OnChanges {

  constructor(private route: ActivatedRoute, private httpService: HttpService, private datePipe: DatePipe) {
  }

  transactions: any = [];
  keyword: string | undefined;
  filter: string | undefined;
  @Input() keywordToTableComponent: string | undefined;
  @Input() filterToTableComponent: string | undefined;

  ngOnInit(): void {
    this.initializeTransactions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.keyword = '';
    if (changes.keywordToTableComponent && changes.keywordToTableComponent.currentValue) {
      this.keyword = changes.keywordToTableComponent.currentValue;
    }
    if (changes.filterToTableComponent && changes.filterToTableComponent.currentValue) {
      this.filter = changes.filterToTableComponent.currentValue;
    }
    this.initializeTransactions();
  }

  initializeTransactions(): void {
    const id = this.route.snapshot.params.id;
    const page = this.route.snapshot.queryParams.page;
    const keywordQuery = this.keyword ? 'keyword=' + this.keyword : '';
    const pageQuery = page ? 'offset=' + page : '';
    const filterQuery = this.filter ? 'filter=' + this.filter : '';
    const httpQuery = (keywordQuery || pageQuery || filterQuery) ? `?${keywordQuery}&${pageQuery}&${filterQuery}` : '';
    try {
      this.httpService.findAllTransactions(`/api/accounts/${id}/transactions${httpQuery}`)
        .subscribe((resp: any) => {
            resp.forEach((transaction: { date: Date | string | null }) => {
              transaction.date = this.datePipe.transform(transaction.date, 'MM-dd-yyyy');
            });
            this.transactions = resp;
          },
          (error: any) => {
            this.transactions = [];
          });
    } catch (err) {
    }
  }

}
