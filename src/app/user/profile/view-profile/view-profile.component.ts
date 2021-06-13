import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { ProfileInfo } from '../../models/profile-info';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  profileInfo?: ProfileInfo;
  jwtDecoder: JwtHelperService;

  constructor(
    private userService: UserHttpService,
    private redirect: Router,
    private route: ActivatedRoute
  ) {
    this.jwtDecoder = new JwtHelperService();
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (!localStorage.getItem('clientPass')) {
      this.redirect.navigate(['/home']);
    }
  }

  ngAfterContentInit(): void {
    if (localStorage.getItem('clientPass')) {
      this.userService
        .getUserProfileInfo(
          this.jwtDecoder.decodeToken(
            localStorage.getItem('clientPass')?.valueOf()
          ).userId
        )
        .pipe(
          take(1),
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
  }

  onUpdate() {
    this.redirect.navigate(['update'], { relativeTo: this.route });
  }
}
