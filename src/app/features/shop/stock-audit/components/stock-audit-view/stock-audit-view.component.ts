import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StockAudit } from '../../models/stock-audit.model';
import { StockAuditService } from '../../services/stock-audit.service';

@Component({
  selector: 'app-stock-audit-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './stock-audit-view.component.html',
  styleUrl: './stock-audit-view.component.css'
})
export class StockAuditViewComponent {
  stockAudit: StockAudit;
  pendingArticles = [];
  auditedArticles = [];

  get isClosed(): boolean {
    return !!this.stockAudit?.closeDate;
  }

  constructor(
    private _route: ActivatedRoute,
    private _service: StockAuditService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.read(id);
  }

  read(id: string) {
    this._service.read(id).subscribe(data => {
      this.stockAudit = data;
      // Aquí el cambio importante:
      this.pendingArticles = data.articlesWithoutAudit; // ver artículos pendientes
      this.auditedArticles = data.articlesAudited || []; // ver artículos auditados
    });
  }

  auditar() {
    const auditedNow = this.pendingArticles.filter(a => a.real != null && a.real !== '');
    if (auditedNow.length === 0) return;
    this._service.updateAuditRealValues(this.stockAudit.id, auditedNow)
      .subscribe(() => {
        this.snackBar.open("Artículos auditados actualizados", "Success", { duration: 5000 });
        this.read(this.stockAudit.id);
      });
  }

  closeAudit() {
    this._service.closeAudit(this.stockAudit.id)
      .subscribe(() => {
        this.snackBar.open("Auditoría cerrada", "Success", { duration: 5000 });
        this.read(this.stockAudit.id);
      });
  }

  get totalLoss() {
    return this.auditedArticles
      .map(a => Math.max(0, a.stock - a.real))
      .reduce((a, b) => a + b, 0);
  }
}