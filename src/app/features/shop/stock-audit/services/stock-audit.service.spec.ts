import { TestBed } from '@angular/core/testing';

import { StockAuditService } from './stock-audit.service';

describe('StockAuditService', () => {
  let service: StockAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
