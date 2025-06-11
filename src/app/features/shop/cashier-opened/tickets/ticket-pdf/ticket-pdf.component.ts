import { Component, OnInit } from '@angular/core';
import { TicketsService } from "../tickets.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-pdf',
  template: '',
  styles: [],
  standalone: true
})
export class TicketPDFComponent implements OnInit {

  constructor(
      private readonly ticketsService: TicketsService,
      private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const reference = params['reference'];
      if (reference) {
        this.getTicket(reference);
      }
    });
  }

    getTicket(reference: string): void {
        const token = localStorage.getItem('tokenGuardar');

        this.ticketsService.getTicket(reference, token).subscribe({
            next: (pdfBlob: Blob) => {
                console.log('PDF obtenido correctamente');
                const url = window.URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ticket_${reference}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            error: (error) => {
                console.error('Error al obtener el PDF', error);
                if (error.status === 401) {
                    console.error("Token inválido o expirado. Intenta refrescarlo.");
                }
            },
            complete: () => {
                console.log('La solicitud ha sido completada.');
            }
        });
    }
}

