import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private http: HttpClient) { }

  getAccounts(id: number): Observable<any> {
    return this.http.get(`/api/v1/accounts/users/${id}`);
  }

  getAccount(accountId: number, userId: number): Observable<any> {
    return this.http.get(`/api/v1/accounts/${accountId}/users/${userId}`);
  }
}
