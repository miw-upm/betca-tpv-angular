import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierClosureComponent } from './cashier-closure.component';

describe('CashierClosureComponent', () => {
  let component: CashierClosureComponent;
  let fixture: ComponentFixture<CashierClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierClosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
