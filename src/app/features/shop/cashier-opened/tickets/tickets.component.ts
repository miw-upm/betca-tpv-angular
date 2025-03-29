import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';

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
} from "@angular/material/table";
import { SearchByBarcodeComponent } from "../../shared/components/search-by-barcode.component";
import { TicketsService } from "./tickets.service";
import {MatTooltip} from "@angular/material/tooltip";
import {Ticket, Tickets} from "./models/tickets.model";
import {AuthService} from "@core/services/auth.service";


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
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    tickets: Tickets[] = [];
    searchReference: string = "";
    displayedColumns: string[] = ['barcode', 'description', 'retailPrice', 'amount', 'state'];
    ticket: Ticket | null = null;

    @ViewChild('code', { static: true }) private readonly elementRef: ElementRef;

    constructor(private readonly ticketsService: TicketsService) {}

    ngOnInit(): void {
        this.synchronizeTickets();
    }

    synchronizeTickets(): void {
    }

    filterTicketsByReference(): void {
        if (this.searchReference) {
            this.ticketsService.filterTicketsByReference(this.searchReference).subscribe(
                (ticket: Ticket) => {
                    this.ticket = ticket;
                },
                (error) => {
                    console.error('Error al filtrar los tickets:', error);
                }
            );

        } else {
            console.error('No se encontró el token o la referencia está vacía');
        }
    }
}
