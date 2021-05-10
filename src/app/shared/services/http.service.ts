import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  findAllTransactions(payload: Record<'id' | 'httpQuery', string>): Observable<any> {
    return this.http.get(`/api/v1/accounts/${payload.id}/transactions${payload.httpQuery}`);
  }
}
