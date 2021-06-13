import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/card/models/card.model';
import { UserCardsResult } from 'src/app/card/models/user-cards-result.model';

@Injectable({
  providedIn: 'root'
})
export class CardHttpService {
  constructor(private http: HttpClient) { }

  getCardsForUser(userId: number): Observable<UserCardsResult> {
    const token = localStorage.getItem("clientPass");
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    const resource = `/api/v1/users/${userId}/cards`;
    return this.http.get<UserCardsResult>(resource, { headers });
  }
}
