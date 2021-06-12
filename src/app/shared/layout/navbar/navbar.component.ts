import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean;
  constructor(public navlink: NavbarService) {
    this.isCollapsed = true;
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    if(!localStorage.getItem('clientPass')) {
      this.navlink.isLoginViewable = true;
      this.navlink.isLogoutViewable = false;
      this.navlink.isProfileViewable = false;
      this.navlink.isAccountsViewable = false;
      this.navlink.isLoansViewable = false;
    }
    else{
      this.navlink.isLoginViewable = false;
      this.navlink.isLogoutViewable = true;
      this.navlink.isProfileViewable = true;
      this.navlink.isAccountsViewable = true;
      this.navlink.isLoansViewable = true;
    }
  }

  onLogout() {
    localStorage.removeItem("clientPass");
  }
}
