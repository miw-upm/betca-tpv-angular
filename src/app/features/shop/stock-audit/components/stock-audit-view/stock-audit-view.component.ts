import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StockAudit } from '../../models/stock-audit.model';

@Component({
  selector: 'app-stock-audit-view',
  imports: [
    MatListModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './stock-audit-view.component.html',
  styleUrl: './stock-audit-view.component.css'
})
export class StockAuditViewComponent {
  stockAudit: StockAudit = {
    identity: 'AUD-2025-001',
    creationDate: new Date('2025-02-01'),
    closeDate: new Date('2025-02-15'),
    articlesWithoutAudit: [
      { barcode: 'Item A', description: 'test', stock: 100 },
      { barcode: 'Item B', description: 'test', stock: 50 },
    ],
    lossValue: 1500,
    losses: [
      { barcode: 'Item A', amount: 5 },
      { barcode: 'Item B', amount: 2 },
    ],
  };
  displayedArticleColumns: string[] = ['name', 'quantity'];
  displayedLossColumns: string[] = ['articleName', 'lostQuantity'];

  constructor(
    private _route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    console.log('Stock audit data:', this.stockAudit);
  }

  closeAudit() {

  }

  updateAudit() {

  }

}
