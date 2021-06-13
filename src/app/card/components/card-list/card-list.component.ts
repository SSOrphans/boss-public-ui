import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selected: Card | undefined
  closeResult: string = "";

  constructor(private router:       Router,
              private route:        ActivatedRoute,
              private httpService:  CardHttpService,
              private modalService: NgbModal)
  { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.loadCards();
  }

  ngOnChanges(): void {
    this.loadCards();
  }

  onCardSelect(card: Card | undefined, content: any) {
    this.selected = card;
    this.modalService.open(content, { ariaLabelledBy: "cardModalTitle", centered: true }).result.then(result => {
      this.closeResult = `Closed with: ${result}`;
    }, reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    }

    return `with: ${reason}`;
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

  displayNameOnCard(card: Card | undefined): string {
    if (card === undefined)
      return "";

    // Place holder!
    return "Sora Katadzuma";
  }

  displayCardNumber(card: Card | undefined): string {
    if (card === undefined)
      return "";
    const number = "xxxx-xxxx-xxxx-";
    return number + card.lastFour;
  }

  displayCardStatus(card: Card | undefined): string {
    if (card === undefined)
      return "";
    let result = "";
    if (card.stolen)
      result = "Stolen";
    else if (card.active)
      result = "Active";
    else
      result = "Locked";
    return result;
  }

  displayCardActivation(card: Card | undefined): string {
    if (card === undefined)
      return "";

    if (card.activatedSince === 0)
      return "Inactive";

    const date = new Date(card.activatedSince);
    const isoDate = date.toISOString();
    const result = isoDate.substr(0, isoDate.indexOf('T'));
    return result;
  }

  displayCardExpiration(card: Card | undefined): string {
    if (card === undefined)
      return "";

    if (card.expirationDate === 0)
      return "Inactive";

    const date = new Date(card.expirationDate);
    let month = '' + date.getMonth();
    const year = ('' + date.getFullYear()).substr(2);
    if (month.length < 2)
      month = '0' + month;

    return [month, year].join('/');
  }
}
