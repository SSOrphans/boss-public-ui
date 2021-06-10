import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean;
  constructor(public navlink: NavbarService, private redirect: Router) {
    this.isCollapsed = true;
  }

  ngOnInit(): void {}

  onLogout() {
    localStorage.removeItem("clientPass");
    this.navlink.isLoginViewable = true;
    this.navlink.isProfileViewable = false;
  }
}
