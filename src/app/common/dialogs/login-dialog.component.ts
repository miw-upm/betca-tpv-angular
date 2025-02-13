import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

import {AuthService} from '@core/services/auth.service';

@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, FormsModule, MatSuffix, MatInput, MatButton, MatIconButton,
        MatFormField, MatIcon, MatDialogActions, MatDialogClose, NgIf],
    templateUrl: 'login-dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class LoginDialogComponent {
    mobile: number;
    password: string;

    constructor(private readonly auth: AuthService, private readonly router: Router, private readonly dialog: MatDialog) {
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
}
