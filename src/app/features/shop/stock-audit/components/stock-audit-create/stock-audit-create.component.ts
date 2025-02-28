import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockAudit } from '../../models/stock-audit.model';

@Component({
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatLabel,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './stock-audit-create.component.html',
  styleUrls: ['./stock-audit-create.component.css']
})
export class StockAuditCreateComponent implements OnInit {

  audit: StockAudit;
  constructor(
    private readonly dialogRef: MatDialogRef<StockAuditCreateComponent>) {
    this.audit = {
      identity: undefined,
      creationDate: new Date(),
      closeDate: undefined,
      articlesWithoutAudit: [],
      lossValue: 0,
      losses: []
    };
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    console.log('Creating audit:', this.audit);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}