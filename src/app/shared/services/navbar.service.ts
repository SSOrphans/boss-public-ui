import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isLoginViewable: boolean;
  isLogoutViewable: boolean;
  isProfileViewable: boolean;

  constructor() {
    this.isLoginViewable = true;
    this.isLogoutViewable = false;
    this.isProfileViewable = false;
  }
}
