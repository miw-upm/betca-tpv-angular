import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscountUpdateComponent } from './customer-discount-update.component';

describe('CustomerDiscountUpdateComponent', () => {
  let component: CustomerDiscountUpdateComponent;
  let fixture: ComponentFixture<CustomerDiscountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDiscountUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDiscountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
