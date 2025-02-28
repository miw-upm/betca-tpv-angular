import { Component } from '@angular/core';
import { StockAuditListComponent } from "./components/stock-audit-list/stock-audit-list.component";
import { MatCardModule } from '@angular/material/card';

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
