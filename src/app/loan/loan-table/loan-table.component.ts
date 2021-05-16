import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from 'src/app/shared/services/loan-http.service';
import {
  SortableHeaderDirective,
  SortEvent,
} from '../directives/sortable-header.directive';
import { Loan } from '../models/loan';
import { sortInfo } from '../models/sortInfo';

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.css'],
})
export class LoanTableComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService
  ) {}
  @ViewChildren(SortableHeaderDirective)
  headers!: QueryList<SortableHeaderDirective>;

  loans: Loan[] = [];
  filter = new FormControl('');

  sortInfo: sortInfo = new sortInfo();

  ngOnInit(): void {
    this.filter.valueChanges.subscribe((value) => {
      this.sortInfo.keyword = value;
      this.sortInfo.page = 1;
      this.initLoans();
    });

    this.initLoans();
  }

  initLoans(): void {
    let id = this.route.snapshot.params.id;
    this.sortInfo.keyword = this.filter.value;
    this.loanService.getUserLoans(id, this.sortInfo).subscribe(
      (data: any) => {
        this.loans = data.content;
        this.sortInfo.collectionSize = data.totalElements;
        this.loans.forEach((loan: Loan) => {
          if (loan.loanType?.includes('_')) {
            loan.loanType = loan.loanType?.split('_')[1].toLocaleLowerCase();
            loan.loanType = loan.loanType
              ?.charAt(0)
              .toLocaleUpperCase()
              .concat(loan.loanType?.slice(1));
          }
        });
      },
      (err: Observable<any>) => {
        this.loans = [];
      }
    );
  }

  onBtnClicked() {
    for (let i = 0; i < 100; i++) {
      let randAmt = Math.random() * 500000;
      let date = new Date();
      date.setFullYear(date.getFullYear() + 7);
      let loan: Loan = {
        branchId: Math.random() * 50,
        userId: 1,
        amount: randAmt.toString(),
        amountDue: (Math.random() * randAmt).toString(),
        interestRate: Math.random().toString(),
        dueBy: this.randomDate(new Date(), date).toISOString().split('T')[0],
        loanType: (Math.floor(Math.random() * 2) + 1).toString(),
      };
      this.loanService.postUserLoan(loan).subscribe(
        (data: any) => {
          this.initLoans();
        },
        (err: Observable<any>) => {}
      );
    }
  }

  onSort(sortEvent: SortEvent): void {
    this.headers.forEach((header) => {
      if (header.sortable !== sortEvent.column) {
        header.direction = '';
      }
    });

    this.sortInfo.sort = sortEvent.column;
    this.sortInfo.direction = sortEvent.direction;
    this.initLoans();
  }
  randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
