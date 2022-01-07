import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { emailSubscribersEndpoint } from 'src/api-constants';

@Injectable({
  providedIn: 'root',
})
export class EmailSubscribersService {
  subscribeEmail(email: any) {
    return this.http.post(emailSubscribersEndpoint, { email }).toPromise();
  }

  constructor(private http: HttpClient) {}
}
