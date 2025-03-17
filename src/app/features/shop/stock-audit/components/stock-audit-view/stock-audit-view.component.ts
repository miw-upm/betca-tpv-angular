import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StockAudit } from '../../models/stock-audit.model';
import { StockAuditService } from '../../services/stock-audit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  displayedArticleColumns: string[] = ['name', 'quantity'];
  displayedLossColumns: string[] = ['articleName', 'lostQuantity'];
  stockAudit: StockAudit;
  constructor(
    private _route: ActivatedRoute,
    private _service: StockAuditService,
    private readonly snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    this.read(id);
  }

  read(id: string) {
    this._service.read(id)
      .subscribe(data => {
        this.stockAudit = data;
      })
  }

  close() {
    this._service.close(this.stockAudit.id)
      .subscribe(() => {
        this.snackBar.open("Stock audit close", "Success", {
          duration: 5000
        });
        this.read(this.stockAudit.id);
      });
  }

  update() {
    this._service.update(this.stockAudit.id)
      .subscribe(() => {
        this.snackBar.open("Stock audit update", "Success", {
          duration: 5000
        });
        this.read(this.stockAudit.id);
      });
  }

}
