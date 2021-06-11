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

  ngAfterContentChecked(): void {
    if(!localStorage.getItem('clientPass')) {
      this.navlink.isLoginViewable = true;
      this.navlink.isLogoutViewable = false;
      this.navlink.isProfileViewable = false;
    }
    else{
      this.navlink.isLoginViewable = false;
      this.navlink.isLogoutViewable = true;
      this.navlink.isProfileViewable = true;
    }
  }

  onLogout() {
    localStorage.removeItem("clientPass");
  }
}
