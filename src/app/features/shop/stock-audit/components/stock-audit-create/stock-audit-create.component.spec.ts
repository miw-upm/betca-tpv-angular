import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAuditCreateComponent } from './stock-audit-create.component';

describe('StockAuditCreateComponent', () => {
  let component: StockAuditCreateComponent;
  let fixture: ComponentFixture<StockAuditCreateComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAuditCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAuditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
