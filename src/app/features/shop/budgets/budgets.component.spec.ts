import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsComponent } from './budgets.component';

describe('BudgetsComponent', () => {
  let component: BudgetsComponent;
  let fixture: ComponentFixture<BudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
