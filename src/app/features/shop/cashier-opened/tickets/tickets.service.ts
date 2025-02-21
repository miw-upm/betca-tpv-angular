import { Injectable } from '@angular/core';
import { Observable, EMPTY } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EndPoints } from "@core/end-points";
import { concatMap } from "rxjs/operators";
import {Tickets} from "./models/tickets.model";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  constructor(private http: HttpClient) {}

  getTickets(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(EndPoints.TICKETS);
  }

  printGiftReceipts(reference: string): Observable<void> {
    return this.http.post<Tickets>(EndPoints.TICKETS, { reference }).pipe(
        concatMap(ticket => this.printGiftTicket(ticket.reference))
    );
  }

  printGiftTicket(ticketId: string): Observable<void> {
    return EMPTY; // TODO: Implement actual print logic
  }
}