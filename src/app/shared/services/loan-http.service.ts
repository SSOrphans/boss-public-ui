import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sortInfo } from 'src/app/loan/models/sortInfo';
import { Loan } from '../../loan/models/loan';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getUserLoans(userID: number, sortInfo: sortInfo): Observable<Loan[]> {
    let url = new URL(`http://localhost:8080/api/users/${userID}/loans`);
    url.searchParams.append('page', (sortInfo.page - 1)?.toString());
    url.searchParams.append('limit', sortInfo.limit?.toString());
    url.searchParams.append('sort', sortInfo.sort);
    url.searchParams.append('sortDir', sortInfo.direction);
    url.searchParams.append('keyword', sortInfo.keyword);
    return this.http.get<Loan[]>(url.href).pipe(catchError(this.handleError));
  }

  postUserLoan(loan: Loan) {
    let url = new URL(`http://localhost:8080/api/loans`);
    return this.http.post(url.href, loan).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
