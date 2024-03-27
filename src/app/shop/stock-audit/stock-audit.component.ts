import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {StockAuditService} from "./stock-audit.service";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";
import {StockAudit} from "../shared/services/models/stock-audit.model";
import {MatDialog} from "@angular/material/dialog";
import {StockAuditDialogComponent} from "./stock-audit-dialog/stock-audit-dialog.component";
import {CancelYesDialogComponent} from "@shared/dialogs/cancel-yes-dialog.component";

@Component({
  templateUrl: 'stock-audit.component.html'
})

export class StockAuditComponent {
  title: string = 'Stock Audit Management';
  stockAudits: Observable<StockAudit[]> = of([]);

  constructor(private dialog: MatDialog,
              private stockAuditService: StockAuditService) {
    this.loadAudits();
  }

  loadAudits(): void {
    this.stockAudits = this.stockAuditService.readAll();
  }

  read(stockAudit: StockAudit): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: "Stock Audit Details",
        object: this.stockAuditService.read(stockAudit)
      }
    });
  }

  create(): void {
    this.dialog.open(CancelYesDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if(result){
          this.stockAuditService.create()
            .subscribe((stockAudit) => {
              this.loadAudits();
              this.update(stockAudit);
            })
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
            width: '100%',
            data: stockAudit
          })
            .afterClosed()
            .subscribe(() => this.loadAudits())
        );
    }
  }

  isClosed(stockAudit: StockAudit): boolean {
    return ((stockAudit.closeDate !== null) && (stockAudit.closeDate !== undefined));
  }
}

