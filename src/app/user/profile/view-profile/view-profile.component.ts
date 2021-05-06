import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { ProfileInfo } from '../../models/profile-info';
import { catchError, first } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  profileInfo?: ProfileInfo;

  constructor(
    private userService: UserHttpService,
    private redirect: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService
      // TODO: login
      // user id is hardcoded to test endpoint
      .getUserProfileInfo(1)
      .pipe(
        first(),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        (info) => {
          this.profileInfo = info;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onUpdate() {
    this.redirect.navigate(['update'], { relativeTo: this.route });
  }
}
