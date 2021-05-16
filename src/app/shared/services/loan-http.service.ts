import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoanType } from 'src/app/loan/models/loanType';
import { SearchOptions } from 'src/app/transaction/models/search-options.model';
import { Loan } from '../../loan/models/loan';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getUserLoans(
    userID: number,
    searchOptions: SearchOptions
  ): Observable<Loan[]> {
    let url = new URL(`http://localhost:8080/api/users/${userID}/loans`);
    url.searchParams.append('page', (searchOptions.page - 1)?.toString());
    url.searchParams.append('limit', searchOptions.limit?.toString());
    url.searchParams.append('sort', searchOptions.sortBy);
    url.searchParams.append(
      'sortDir',
      searchOptions.sortDirection.toLowerCase()
    );
    url.searchParams.append('keyword', searchOptions.keyword);
    url.searchParams.append('filter', searchOptions.filter);
    return this.http.get<Loan[]>(url.href).pipe(catchError(this.handleError));
  }

  getAllLoanTypes(): Observable<LoanType[]> {
    let url = new URL(`http://localhost:8080/api/loans/types`);
    return this.http
      .get<LoanType[]>(url.href)
      .pipe(catchError(this.handleError));
  }

  postUserLoan(loan: Loan) {
    let url = new URL(`http://localhost:8080/api/loans`);
    return this.http.post(url.href, loan).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
