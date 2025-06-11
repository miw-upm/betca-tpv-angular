import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StockAuditListComponent } from "./components/stock-audit-list/stock-audit-list.component";

@Component({
  selector: 'app-stock-audit',
  imports: [
    StockAuditListComponent,
    MatCardModule],
  templateUrl: './stock-audit.component.html',
  styleUrl: './stock-audit.component.css'
})
export class StockAuditComponent {

}
