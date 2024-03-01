import { TestBed } from '@angular/core/testing';

import { SlackMessagesService } from './slack-messages.service';

describe('SlackMessagesService', () => {
  let service: SlackMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlackMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
