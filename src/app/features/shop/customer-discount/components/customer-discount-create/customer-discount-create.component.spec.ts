import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscountCreateComponent } from './customer-discount-create.component';

describe('CustomerDiscountCreateComponent', () => {
  let component: CustomerDiscountCreateComponent;
  let fixture: ComponentFixture<CustomerDiscountCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDiscountCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDiscountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
