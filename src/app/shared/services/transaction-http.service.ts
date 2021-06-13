import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionHttpService {

  constructor(private http: HttpClient) {
  }

  findAllTransactions(payload: Record<'id' | 'httpQuery', string>): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accounts/${payload.id}/transactions${payload.httpQuery}`);
  }
}
