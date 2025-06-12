import { Component, Inject } from '@angular/core';
import { CustomerDiscountDto } from "../../models/customer-discount.model";
import { CustomerDiscountService } from "../../customer-discount-service/customer-discount-service";
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogActions
} from "@angular/material/dialog";


@Component({
  selector: 'app-customer-discount-delete',
  imports: [MatDialogModule, MatDialogContent, MatDialogClose, MatDialogActions],
  templateUrl: './customer-discount-delete.component.html',
  styleUrl: './customer-discount-delete.component.css'
})
export class CustomerDiscountDeleteComponent {
  userMobile: number;
  constructor(@Inject(MAT_DIALOG_DATA) data: CustomerDiscountDto, private readonly customerDiscountService: CustomerDiscountService, public dialog: MatDialog) {
    this.userMobile = data.userMobile;
  }

  delete() {
    this.customerDiscountService.delete(this.userMobile).subscribe((result) => {
      console.log(result);
      this.dialog.closeAll();
    });
  }
}
