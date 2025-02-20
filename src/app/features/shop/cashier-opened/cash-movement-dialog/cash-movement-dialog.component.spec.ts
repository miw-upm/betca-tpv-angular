import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMovementDialogComponent } from './cash-movement-dialog.component';

describe('CashMovementDialogComponent', () => {
  let component: CashMovementDialogComponent;
  let fixture: ComponentFixture<CashMovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashMovementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashMovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
