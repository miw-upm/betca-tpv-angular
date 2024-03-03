import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@core/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {SignupDialogComponent} from "@shared/dialogs/signup-dialog.component";
import {PasswordRecoveryDialogComponent} from "@shared/dialogs/password-recovery-dialog.component";

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class LoginDialogComponent {
  mobile: number;
  password: string;

  constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) {
  }

  login(): void {
    this.auth.login(this.mobile, this.password).subscribe(
      () => {
        if (this.auth.untilOperator()) {
          this.router.navigate(['shop']).then().finally(() => this.dialog.closeAll());
        } else {
          this.dialog.closeAll();
        }
      }
    );
  }

  signUp(): void {
    this.dialog.open(SignupDialogComponent);
  }

  forgotPassword(): void {
    this.dialog.open(PasswordRecoveryDialogComponent);
  }
}
