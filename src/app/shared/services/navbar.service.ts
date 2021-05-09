import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isLoginViewable: boolean;
  isProfileViewable: boolean;

  constructor() {
    this.isLoginViewable = true;
    this.isProfileViewable = false;
  }
}
