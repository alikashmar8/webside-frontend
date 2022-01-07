import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersEndpoint } from 'src/api-constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  sendContactUsEmail(data: any) {
    return this.http.post(usersEndpoint+ '/send-contact-us-email', { data });
  }
}
