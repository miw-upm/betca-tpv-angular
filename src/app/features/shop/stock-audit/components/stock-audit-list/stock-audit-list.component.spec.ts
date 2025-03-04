import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAuditListComponent } from './stock-audit-list.component';

describe('AuditListComponent', () => {
  let component: StockAuditListComponent;
  let fixture: ComponentFixture<StockAuditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAuditListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
