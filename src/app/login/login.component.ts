import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private redirect: Router, private navlink: NavbarService) {
  }

  ngOnInit(): void {}

  onLogin() {
    this.navlink.isLoginViewable = false;
    this.navlink.isProfileViewable = true;
    this.redirect.navigate(['home']);
  }
}
