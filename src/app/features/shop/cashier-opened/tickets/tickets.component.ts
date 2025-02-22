import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
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
    MatTable
} from "@angular/material/table";
import { SearchByBarcodeComponent } from "../../shared/components/search-by-barcode.component";
import { TicketsService } from "./tickets.service";
import {MatTooltip} from "@angular/material/tooltip";
import {Tickets} from "./models/tickets.model";

@Component({
    standalone: true,
    selector: 'app-ticket',
    templateUrl: './tickets.component.html',
    imports: [
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
        MatTooltip
    ],
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    tickets: Tickets[] = [];
    filteredTickets: Tickets[] = [];
    searchReference: string = "";
    selectedTicket: Tickets | null = null;
    displayedColumns = ['id', 'reference', 'expireDate'];

    @ViewChild('code', { static: true }) private readonly elementRef: ElementRef;

    constructor(private readonly ticketsService: TicketsService) {}

    ngOnInit(): void {
        this.synchronizeTickets();
    }

    synchronizeTickets(): void {
        this.ticketsService.getTickets().subscribe(data => {
            this.tickets = data;
            this.filteredTickets = data;
        });
    }

    filterTicketsByReference(): void {
        this.filteredTickets = this.tickets.filter(ticket =>
            ticket.reference.toLowerCase().includes(this.searchReference.toLowerCase())
        );
    }

    selectTicket(ticket: Tickets): void {
        this.selectedTicket = ticket;
    }

    printTicket(): void {
        if (this.selectedTicket) {
            this.ticketsService.printGiftReceipts(this.selectedTicket.reference).subscribe(() => {
                alert('Ticket impreso con éxito');
            });
        }
    }
}
