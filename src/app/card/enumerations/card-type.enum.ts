export enum CardType {
  plain    = 0,
  gold     = 1,
  platinum = 2,
}

export function typeName(type: CardType): string {
  let result = "";
  switch (type) {
    case CardType.plain:
      result = "Plain"; break;
    case CardType.gold:
      result = "Gold"; break;
    case CardType.platinum:
      result = "Platinum"; break;
  }

  return result;
}
