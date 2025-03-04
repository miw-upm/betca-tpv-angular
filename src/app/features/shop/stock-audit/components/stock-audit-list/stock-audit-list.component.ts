import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StockAudit } from '../../models/stock-audit.model';
import { StockAuditCreateComponent } from '../stock-audit-create/stock-audit-create.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-stock-audit-list',
  templateUrl: './stock-audit-list.component.html',
  styleUrls: ['./stock-audit-list.component.css'],
  imports: [
    MatTableModule, 
    MatButtonModule, 
    DatePipe, 
    MatDialogModule
  ]
})
export class StockAuditListComponent implements OnInit {
  displayedColumns: string[] = ['identity', 'creationDate', 'closeDate', 'articlesWithoutAudit', 'lossValue', 'losses', 'action'];
  stockAudits= [{
    identity: 'AUD-2025-001',
    creationDate: new Date(),
    closeDate: new Date(),
    articlesWithoutAudit: [
      { barcode: 'Item A', description:'test', stock: 100 },
      { barcode: 'Item B', description:'test', stock: 50 },
    ],
    lossValue: 1500,
    losses: [
      { barcode: 'Item A', amount: 5 },
      { barcode: 'Item B', amount: 2 },
    ]
  }]
   
  constructor(
    private dialog: MatDialog,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  createAudit(): void {
    this.dialog.open(StockAuditCreateComponent, {
      width: '600px'
    });
  }

  ver(id: string): void {
    console.log("view: " + id );
    this.router.navigate(['shop/stock-audit/view', id]).then();
  }

  closeAudit(id: string): void {
    console.log("close: " + id )

  }
}