import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf, CommonModule} from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableModule
} from "@angular/material/table";
import { SearchByBarcodeComponent } from "../../shared/components/search-by-barcode.component";
import { TicketsService } from "./tickets.service";
import {MatTooltip} from "@angular/material/tooltip";
import {Ticket, Tickets} from "./models/tickets.model";

@Component({
    standalone: true,
    selector: 'app-ticket',
    templateUrl: './tickets.component.html',
    imports: [
        CommonModule,
        CurrencyPipe,
        FormsModule,
        MatButton,
        MatCheckbox,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatSuffix,
        NgIf,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        SearchByBarcodeComponent,
        MatTooltip,
        MatFormFieldModule,
        MatInputModule,
        DatePipe,
        MatTableModule
    ],
})
export class TicketsComponent {
    tickets: Tickets[] = [];
    searchReference: string = "";
    displayedColumns: string[] = ['barcode', 'description', 'retailPrice', 'amount', 'state'];
    ticket: Ticket | null = null;

    @ViewChild('code', { static: true }) private readonly elementRef: ElementRef;

    constructor(private readonly ticketsService: TicketsService) {}

    filterTicketsByReference(): void {
        if (this.searchReference) {
            this.ticketsService.filterTicketsByReference(this.searchReference).subscribe({
                next: (ticket: Ticket) => {
                    this.ticket = ticket;
                },
                error: (error) => {
                    console.error('Error al filtrar los tickets:', error);
                },
                complete: () => {
                    console.log('Filtering complete');
                }
            });
        } else {
            console.error('No se encontró el token o la referencia está vacía');
        }
    }
}
