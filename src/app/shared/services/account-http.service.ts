import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private http: HttpClient) { }

  getAccounts(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accounts/users/${id}`);
  }

  getAccount(accountId: number, userId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accounts/${accountId}/users/${userId}`);
  }

  postAccount(accountType: number, userId: number): Observable<any> {

    return this.http.post(
      `${environment.apiUrl}/api/v1/accounts`,
      {
        "account_type": accountType,
        "user_id": userId,
      });
  }
}
