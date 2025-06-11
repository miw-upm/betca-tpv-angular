import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EndPoints } from '@core/end-points';
import {Ticket} from "./models/tickets.model";

@Injectable({ providedIn: 'root' })
export class TicketsService {

  constructor(private readonly http: HttpClient) {}

  getTicket(reference: string, token: string): Observable<Blob> {
    const url = `${EndPoints.TICKETS}/${reference}/reference`;
    console.log("Llamando a la API:", url);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/pdf'
    });

    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
        catchError(error => {
          console.error('Error en la petición del PDF', error);
          if (error.status === 401) {
            console.error("error.status " + error.status + "Acceso no autorizado. Verifica el token.");
          }
          return throwError(() => new Error(error));
        })
    );
  }

    filterTicketsByReference(searchReference: string): Observable<Ticket> {
        const url = `${EndPoints.TICKETS}/${searchReference}/reference/data`;

        return this.http.get<Ticket>(url).pipe(
            catchError(error => {
                if (error.status === 401) {
                    console.error("error.status " + error.status + "Acceso no autorizado. Verifica el token.");
                }
                console.error('Error al filtrar los tickets:', error);
                return throwError(() => new Error(error));
            })
        );
    }
}