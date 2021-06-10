import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  images: any;

  constructor(config: NgbCarouselConfig) {
    config.interval = 8000;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
   }

  ngOnInit(): void {
    this.images = ["../assets/images/office-building.jpg", "../assets/images/empty-office-building.jpg"]
  }

}
