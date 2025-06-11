import { Component } from "@angular/core";
import { CustomerDiscount } from "../../models/customer-discount.model";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerDiscountService } from "../../customer-discount-service/customer-discount-service";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogClose } from "@angular/material/dialog";
import { MatDialogContent } from "@angular/material/dialog";
import { MatDialogActions } from "@angular/material/dialog";
import { CustomerDiscountDto } from "../../models/customer-discount.model";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-customer-discount-update',
  imports: [MatDialogModule, MatDialogContent, MatDialogClose, MatDialogActions, ReactiveFormsModule],
  templateUrl: './customer-discount-update.component.html',
  styleUrl: './customer-discount-update.component.css',
  standalone: true
})
export class CustomerDiscountUpdateComponent {
  userMobile: number;
  discountForm = new FormGroup({
    note: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
    minimumPurchase: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: CustomerDiscountDto, private customerDiscountService: CustomerDiscountService, public dialog: MatDialog) { 
     this.userMobile = data.userMobile;
  }


  update(): void {
    if (this.discountForm.valid) {
      const formValue = this.discountForm.value;
      const userMobile = this.userMobile;
      const customerDiscount: CustomerDiscount = {
        user: {
          mobile: userMobile,
          token: ''
        },
        note: formValue.note,
        registrationDate: new Date(),
        discount: Number(formValue.discount),
        minimumPurchase: Number(formValue.minimumPurchase)
      };

      this.customerDiscountService.update(userMobile, customerDiscount).subscribe((result) => {
        console.log(result);
        this.dialog.closeAll();
      });
    } else {
      console.log('Form is invalid', this.discountForm.errors);
    }
  }
}
