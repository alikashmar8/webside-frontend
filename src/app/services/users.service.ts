import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersEndpoint } from 'src/api-constants';
import { ContactUsEmailDTO } from 'src/dtos/contact-us-email.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  sendContactUsEmail(data: ContactUsEmailDTO) {
    return this.http
      .post(usersEndpoint + 'send-contact-us-email', {...data })
      .toPromise();
  }
}
