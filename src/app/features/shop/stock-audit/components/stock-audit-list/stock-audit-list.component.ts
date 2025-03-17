import { StockAuditService } from './../../services/stock-audit.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
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
    MatDialogModule,
    CommonModule
  ]
})
export class StockAuditListComponent implements OnInit {
  displayedColumns: string[] = ['creationDate', 'closeDate', 'articlesWithoutAudit', 'lossValue', 'losses', 'action'];
  stockAudits:StockAudit[]
  constructor(
    private dialog: MatDialog,
    private readonly router: Router,
    private stockAuditService: StockAuditService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.stockAuditService.findAll()
    .subscribe(data => this.stockAudits = data);
  }

  createAudit(): void {
    this.dialog.open(StockAuditCreateComponent, {
      width: '600px'
    }).afterClosed().subscribe(data => {
      if(data){
         this.findAll();
      }
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