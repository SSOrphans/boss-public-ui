import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardHttpService } from 'src/app/shared/services/card-http.service';
import { typeName } from '../../enumerations/card-type.enum';
import { Card } from '../../models/card.model';
import { UserCardsResult } from '../../models/user-cards-result.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnChanges {
  userId: number = 0;
  cards:  Card[] = [];

  constructor(private router:      Router,
              private route:       ActivatedRoute,
              private httpService: CardHttpService)
  { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.loadCards();
  }

  ngOnChanges(): void {
    this.loadCards();
  }

  onCardSelect(cardId: number) {
    this.router.navigate([`cards/${cardId}`]);
  }

  loadCards(): void {
    try {
      this.httpService.getCardsForUser(this.userId)
        .subscribe(this.showCards, () => {});
    } catch (error: any) {
      console.log(error);
    }
  }

  showCards = (value: UserCardsResult): void => {
    console.log(value);
    this.cards = value.cards;
  };

  displayCardType(card: Card): string {
    return typeName(card.type);
  }

  displayCardNumber(card: Card): string {
    const number = "xxxx-xxxx-xxxx-";
    return number + card.lastFour;
  }

  displayCardStatus(card: Card): string {
    let result = "";
    if (card.stolen)
      result = "Stolen";
    else if (card.active)
      result = "Active";
    else
      result = "Locked";
    return result;
  }

  displayCardActivation(card: Card): string {
    console.log(card.activatedSince);
    if (card.activatedSince === 0)
      return "Inactive";

    const date = new Date(card.activatedSince);
    const isoDate = date.toISOString();
    const result = isoDate.substr(0, isoDate.indexOf('T'));
    return result;
  }

  displayCardExpiration(card: Card): string {
    console.log(card.expirationDate);
    if (card.expirationDate === 0)
      return "Inactive";

    const date = new Date(card.expirationDate);
    let month = '' + date.getMonth();
    const year = '' + date.getFullYear();
    if (month.length < 2)
      month = '0' + month;

    return [month, year].join('/');
  }
}
