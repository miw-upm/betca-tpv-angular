import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCreateComponent } from './budget-create.component';

describe('BudgetCreateComponent', () => {
  let component: BudgetCreateComponent;
  let fixture: ComponentFixture<BudgetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
