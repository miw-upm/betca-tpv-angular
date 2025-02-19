import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFiltersComponent } from './budget-filters.component';

describe('BudgetFiltersComponent', () => {
  let component: BudgetFiltersComponent;
  let fixture: ComponentFixture<BudgetFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
