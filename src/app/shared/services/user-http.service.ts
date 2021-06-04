import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProfileInfo} from 'src/app/user/models/profile-info';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  constructor(private http: HttpClient) {
  }

  loginUser(loginDetails: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, loginDetails);
  }

  registerUser(user: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/users/registration`, user);
  }

  forgotPass(email: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/v1/user/email`, email);
  }

  resetPass(jwt: object): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/v1/user/password`, jwt)
  }

  getUserProfileInfo(userID: number): Observable<ProfileInfo> {
    // TODO: login
    // user id is hardcoded to test endpoint
    return this.http.get(`${environment.apiUrl}/api/v1/users/${userID}`);
  }

  updateProfile(userID: number, user: object): Observable<any> {
    // TODO: login
    // user id is hardcoded to test endpoint
    return this.http.put(`${environment.apiUrl}/api/v1/users/${userID}`, user);
  }
}
