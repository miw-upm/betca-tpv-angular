import { Component } from "@angular/core";
import { CustomerDiscount } from "../../models/customer-discount.model";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerDiscountService } from "../../customer-discount-service/customer-discount-service";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogActions
} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-discount-create',
  imports: [MatDialogContent, MatDialogClose, MatDialogActions, ReactiveFormsModule],
  templateUrl: './customer-discount-create.component.html',
  styleUrl: './customer-discount-create.component.css',
  standalone: true
})
export class CustomerDiscountCreateComponent {
  customerDiscount: CustomerDiscount;
  discountForm = new FormGroup({
    userMobile: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
    minimumPurchase: new FormControl('', Validators.required),
  });

  constructor(private readonly customerDiscountService: CustomerDiscountService, public dialog: MatDialog) { }


  create(): void {
    if (this.discountForm.valid) {
      const formValue = this.discountForm.value;

      const customerDiscount: CustomerDiscount = {
        user: {
          mobile: +formValue.userMobile,
          token: ''
        },
        note: formValue.note,
        registrationDate: new Date(),
        discount: Number(formValue.discount),
        minimumPurchase: Number(formValue.minimumPurchase)
      };

      this.customerDiscountService.create(customerDiscount).subscribe((result) => {
        console.log(result);
        this.dialog.closeAll();
      });
    } else {
      console.log('Form is invalid', this.discountForm.errors);
    }
  }
}
