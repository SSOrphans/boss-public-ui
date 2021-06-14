import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCardsResult } from 'src/app/card/models/user-cards-result.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardHttpService {
  constructor(private http: HttpClient) { }

  getCardsForUser(userId: number): Observable<UserCardsResult> {
    const token = localStorage.getItem("clientPass");
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    const resource = `${environment.apiUrl}/api/v1/users/${userId}/cards`;
    return this.http.get<UserCardsResult>(resource, { headers });
  }
}
