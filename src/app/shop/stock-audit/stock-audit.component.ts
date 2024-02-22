import { Component, OnInit } from '@angular/core';
import {of} from "rxjs";
import {StockAuditService} from "./stock-audit.service";

@Component({
  templateUrl: 'stock-audit.component.html'
})

export class StockAuditComponent {
  title = 'Stock Audit Management';
  stockAudits = of([]);

  constructor(private stockAuditService: StockAuditService) {
    this.loadAudits();
  }

  loadAudits(): void {
    this.stockAudits = this.stockAuditService.search();
  }
}

