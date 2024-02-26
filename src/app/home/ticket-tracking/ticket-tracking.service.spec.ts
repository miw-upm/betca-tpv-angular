import { TestBed } from '@angular/core/testing';

import { TicketTrackingService } from './ticket-tracking.service';

describe('TicketTrackingService', () => {
  let service: TicketTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
