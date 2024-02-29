import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {StockAuditService} from "./stock-audit.service";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {StockAudit} from "../shared/services/models/stock-audit.model";
import {MatDialog} from "@angular/material/dialog";
import {StockAuditDialogComponent} from "./stock-audit-dialog/stock-audit-dialog.component";

@Component({
  templateUrl: 'stock-audit.component.html'
})

export class StockAuditComponent {
  title: string = 'Stock Audit Management';
  stockAudits: Observable<StockAudit[]> = of([]);
  edit: boolean = false;
  constructor(private dialog: MatDialog,
              private stockAuditService: StockAuditService) {
    this.loadAudits();
  }

  loadAudits(): void {
    this.stockAudits = this.stockAuditService.search();
  }

  create(): void {
    this.dialog.open(StockAuditDialogComponent, {
      width: '80%'
    })
      .afterClosed()
      .subscribe(() => this.loadAudits())
  }

  read(stockAudit: StockAudit): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: "Stock Audit Details",
        object: this.stockAuditService.read(stockAudit)
      }
    });
  }

  update(stockAudit: StockAudit): void {
    if(this.isClosed(stockAudit)){
      alert("You can't update a closed stock audit!");
    } else {
      this.stockAuditService.read(stockAudit)
        .subscribe(stockAudit =>
          this.dialog.open(StockAuditDialogComponent, {
            width: '80%',
            data: stockAudit
          })
            .afterClosed()
            .subscribe(() => this.loadAudits())
        );
    }
  }

  isClosed(stockAudit: StockAudit): boolean {
    return stockAudit.closeDate !== null;
  }
}

