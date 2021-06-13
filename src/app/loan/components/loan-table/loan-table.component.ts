import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faFilter,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { LoanService } from 'src/app/shared/services/loan-http.service';
import { SearchOptions } from 'src/app/transaction/models/search-options.model';
import { Loan } from '../../models/loan';
import { LoanType } from '../../models/loanType';

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.css'],
})
export class LoanTableComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private redirect: Router
  ) {}

  loans: Loan[] = [];
  loanTypes: LoanType[] = [];
  searchBar = new FormControl('');
  selectedFilter = '';
  options = new SearchOptions();

  faSortDown = faSortDown;
  faFilter = faFilter;
  faSortUp = faSortUp;

  ngOnInit(): void {
    this.searchBar.valueChanges.subscribe((value) => {
      this.options.keyword = value;
      this.options.page = 1;
      this.initLoans();
    });
    this.options.sortBy = 'loanNumber';
    this.initLoans();
  }

  ngDoCheck(): void {
    if (!localStorage.getItem('clientPass')) {
      this.redirect.navigate(['/home']);
    }
  }
  
  initLoanTypes(): void {
    this.loanService.getAllLoanTypes().subscribe(
      (data: LoanType[]) => {
        this.loanTypes = data;
      },
      (err: Observable<any>) => {
        this.loanTypes = [];
      }
    );
  }

  initLoans(): void {
    this.initLoanTypes();
    let id = this.route.snapshot.params.id;
    this.options.keyword = this.searchBar.value;

    this.options.filter =
      this.selectedFilter === ''
        ? ''
        : 'LOAN_'.concat(this.selectedFilter.toUpperCase());
    this.loanService.getUserLoans(id, this.options).subscribe(
      (data: any) => {
        this.loans = data.content;
        this.options.collectionSize = data.totalElements;
        this.loans.forEach((loan: Loan) => {
          if (loan.loanType?.includes('_')) {
            loan.loanType = this.formatLoanType(loan.loanType);
          }
        });
      },
      (err: Observable<any>) => {
        this.loans = [];
      }
    );
  }
  formatLoanType(type: string | null | undefined) {
    if (type === 'LOAN_UNKNOWN') {
      type = 'None';
    }

    let loanType = type?.toLowerCase().replace('loan_', '');
    if (loanType) {
      loanType = loanType[0]?.toUpperCase() + loanType?.substring(1);
    }
    return loanType;
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

  onSortChange(sort: string): void {
    this.options.setSortBy(sort);
    this.options.page = 1;
    this.initLoans();
  }

  onFilter(event: any): void {
    this.options.page = 1;
    let type = event.target.textContent.trim();
    this.selectedFilter = type === 'None' ? '' : type;
    this.initLoans();
  }

  onLimitSelect() {
    this.options.page = 1;
    this.initLoans();
  }

  randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
