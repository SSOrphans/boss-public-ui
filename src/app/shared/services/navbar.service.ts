import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isLoginViewable: boolean;
  isLogoutViewable: boolean;
  isProfileViewable: boolean;
  isAccountsViewable: boolean;
  isLoansViewable: boolean;
  isCardsViewable: boolean;

  constructor() {
    this.isLoginViewable = true;
    this.isLogoutViewable = false;
    this.isProfileViewable = false;
    this.isAccountsViewable = false;
    this.isLoansViewable = false;
    this.isCardsViewable = false;
  }
}
