import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAuditViewComponent } from './stock-audit-view.component';

describe('StockAuditViewComponent', () => {
  let component: StockAuditViewComponent;
  let fixture: ComponentFixture<StockAuditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAuditViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAuditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
