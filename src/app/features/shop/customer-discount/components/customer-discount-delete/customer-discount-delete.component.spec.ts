import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscountDeleteComponent } from './customer-discount-delete.component';

describe('CustomerDiscountDeleteComponent', () => {
  let component: CustomerDiscountDeleteComponent;
  let fixture: ComponentFixture<CustomerDiscountDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDiscountDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDiscountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
