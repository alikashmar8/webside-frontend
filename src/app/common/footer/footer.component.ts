import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmailSubscribersService } from 'src/app/services/email-subscribers.service';
import { isEmail } from 'src/functions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  email: string;

  constructor(
    private emailSubscribersService: EmailSubscribersService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async subscribeEmail() {
    if (!isEmail(this.email)) {
      this.alertService.toastError('Please enter a valid email address');
      return;
    }

    try {
      await this.emailSubscribersService.subscribeEmail(this.email);
      this.alertService.toastSuccess('Email Subscribed successfully!');
      this.email = '';
    } catch (e) {
      const errors: string[] = this.authService.getHttpErrors(e);
      console.log(errors);

      errors.forEach((error) => {
        this.alertService.toastError(error);
      });
    }
  }
}
