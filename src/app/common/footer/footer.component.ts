import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
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
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  subscribeEmail() {
    if (!isEmail(this.email)) {
      this.alertService.toastError('Please enter a valid email address');
      return;
    }
    this.emailSubscribersService.subscribeEmail(this.email);
  }
}
