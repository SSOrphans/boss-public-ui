import { CardType } from "../enumerations/card-type.enum";

export class Card {
  public id:             number   = 0;
  public type:           CardType = 0;
  public lastFour:       string   = "";
  public created:        number   = 0;
  public activatedSince: number   = 0;
  public expirationDate: number   = 0;
  public confirmed:      boolean  = false;
  public active:         boolean  = false;
  public stolen:         boolean  = false;
}
