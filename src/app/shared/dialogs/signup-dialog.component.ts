import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {
  mobile: number;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private dialog: MatDialog) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.dialog.closeAll();
      return;
    }
    this.router.navigate(['shop']).then().finally(() => this.dialog.closeAll());
  }
}
