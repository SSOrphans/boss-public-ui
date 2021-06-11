import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private navlink: NavbarService) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.navlink.isLoginViewable = false;
  }

}
