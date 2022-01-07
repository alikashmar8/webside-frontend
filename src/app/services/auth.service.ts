import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from 'src/api-constants';
import { AlertService } from './alert.service';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User | null>;
  public currentUserObservable: Observable<User | null>;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private alertService: AlertService,
    private router: Router,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {
    const s = localStorage.getItem('currentUser');
    if (s != null) {
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(s));
    } else {
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
    }

    this.currentUserObservable = this.currentUserSubject?.asObservable();
  }

  public get currentUser(): User | null {
    return this.currentUserSubject?.value;
  }

  loginByUsername(data: { username: string; password: string }) {
    return this.http.post<any>(`${apiUrl}auth/login`, data).pipe(
      map((user) => {
        console.log(user);
        console.log(user.user);
        console.log(user.access_token);

        localStorage.setItem('currentUser', JSON.stringify(user.user));
        localStorage.setItem('access_token', user.access_token);
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  getHttpErrors(errorResponse: HttpErrorResponse) {
    // 1 - Create empty array to store errors
    const errors = [];

    // 2 - check if the error object is present in the response
    if (errorResponse.error) {

      // optional
      // 3 - Push the main error message to the array of errors
      // errors.push(errorResponse.message);

      // 4 - Check for Laravel form validation error messages object
      if (errorResponse.error) {
        // 5 - For each error property (which is a form field)
        for (const property in errorResponse.error) {
          if (errorResponse.error.hasOwnProperty(property)) {
            // 6 - Extract it's array of errors
            const propertyErrors: Array<string> =
              errorResponse.error[property];

            // 7 - Push all errors in the array to the errors array
            propertyErrors.forEach((error) => errors.push(error));
          }
        }
      }
    }
    return errors;
  }

}
