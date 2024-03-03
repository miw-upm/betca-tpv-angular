import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-recovery-dialog',
  templateUrl: './password-recovery-dialog.component.html',
  styleUrls: ['./password-recovery-dialog.component.css']
})
export class PasswordRecoveryDialogComponent implements OnInit {
  email: string;
  mobile: number;

  constructor() { }

  ngOnInit(): void {
  }

  sendEmail(){

  }

}
