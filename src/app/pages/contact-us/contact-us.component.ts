import { loadingGifUrl } from './../../../constants';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ContactUsEmailDTO } from 'src/dtos/contact-us-email.dto';
import { isEmail } from 'src/functions';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  data: ContactUsEmailDTO = {
    name: null,
    email: null,
    subject: null,
    message: null,
  };

  isSending: boolean = false;
  loadingGifUrl: string = loadingGifUrl;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  async sendEmail() {
    this.isSending = true;
    if (!this.data.name) {
      this.alertService.toastError('Name should not be empty');
      this.isSending = false;
      return;
    }
    if (!this.data.email) {
      this.alertService.toastError('Email should not be empty');
      this.isSending = false;
      return;
    }
    if (!isEmail(this.data.email)) {
      this.alertService.toastError('Please enter a valid email address');
      this.isSending = false;
      return;
    }
    if (!this.data.subject) {
      this.alertService.toastError('Subject should not be empty');
      this.isSending = false;
      return;
    }
    if (!this.data.message) {
      this.alertService.toastError('Message should not be empty');
      this.isSending = false;
      return;
    }

    try {
      await this.usersService.sendContactUsEmail(this.data);
      this.alertService.toastSuccess('Message sent successfully');
      this.data = {
        name: null,
        email: null,
        subject: null,
        message: null,
      };
      this.isSending = false;
    } catch (err) {
      const errors = this.authService.getHttpErrors(err);
      errors.forEach((error) => {
        this.alertService.toastError(error);
      });
      this.isSending = false;
    }
  }
}
