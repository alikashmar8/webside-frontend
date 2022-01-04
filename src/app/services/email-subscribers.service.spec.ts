import { TestBed } from '@angular/core/testing';

import { EmailSubscribersService } from './email-subscribers.service';

describe('EmailSubscribersService', () => {
  let service: EmailSubscribersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSubscribersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
