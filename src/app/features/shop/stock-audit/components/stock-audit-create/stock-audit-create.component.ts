import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StockAuditService } from '../../services/stock-audit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
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
    private stockAuditService: StockAuditService,
    private readonly snackBar: MatSnackBar
   ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.stockAuditService.create()
    .subscribe(() =>{
      this.snackBar.open("Stock audit create", "Success", {
        duration: 5000
      });
      this.dialogRef.close(true);
    })
  }

  close() {
    this.dialogRef.close();
  }
}