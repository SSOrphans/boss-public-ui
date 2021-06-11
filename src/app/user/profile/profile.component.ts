import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private navlink: NavbarService, private redirect: Router) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if(!localStorage.getItem('clientPass')) {
      this.redirect.navigate(['/home']);
    }
  }
}
