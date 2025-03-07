import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StockAuditService } from '../../services/stock-audit.service';

@Component({
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './stock-audit-create.component.html',
  styleUrls: ['./stock-audit-create.component.css']
})
export class StockAuditCreateComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<StockAuditCreateComponent>,
     private stockAuditService: StockAuditService
   ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.stockAuditService.create()
    .subscribe(() =>{
      this.dialogRef.close(true);
    })
  }

  close() {
    this.dialogRef.close();
  }
}