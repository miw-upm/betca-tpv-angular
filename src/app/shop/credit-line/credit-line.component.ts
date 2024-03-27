  import {Component,} from '@angular/core';
  import { MatDialog} from '@angular/material/dialog';
  import {CreditLineService} from './credit-line.service';
  import {CreditLine} from './credit-line.model';
  import {forkJoin, Observable, of, switchMap} from "rxjs";
  import {map} from "rxjs/operators";
  import {TicketService} from "../cashier-opened/tickets/tickets.service";
  import {User} from "@shared/models/user.models";
  import {MatSnackBar} from "@angular/material/snack-bar";
  import {CashierState} from "../cashier-opened/cashier-closure/cashier-state.model";
  import {CashierClosureService} from "../cashier-opened/cashier-closure/cashier-closure.service";





  @Component({
    templateUrl: 'credit-line.component.html'
  })

  export class CreditLineComponent {

    mobile = "";
    creditLine: CreditLine;
    card = false;
    cash = false;
    total = 0;
    unpaidTickets: Observable<Number>;

    constructor(private dialog: MatDialog, private creditLineService: CreditLineService,
                private ticketService: TicketService, private cashierService: CashierClosureService,
                private snackBar: MatSnackBar) {

    }


    clearMobile(){
      this.mobile ="";
    }
    create(mobile: string): void {
      this.creditLineService.create(Number(mobile)).subscribe(
        createdCreditLine => {
          console.log('Credit line created:', createdCreditLine);
          this.snackBar.open('Credit line created successfully', 'Close', {
            duration: 3000, // Duración del mensaje en milisegundos
          });
        },
        error => {
          console.error('Error creating credit line:', error);
          this.snackBar.open('Error creating credit line', 'Close', {
            duration: 3000,
          });
        }
      );
    }


    searchUnpaidTicketsByMobile(mobile: string): void {
      const creditLine = this.creditLineService.findCreditByUserReference(mobile);
      this.unpaidTickets = creditLine.pipe(
        switchMap(creditLine => {
          if (!creditLine) {
            this.snackBar.open('El crédito no existe', 'Cerrar', {
              duration: 3000,
            });
            return of(0);
          }
          if (creditLine.sales.length === 0) {
            this.snackBar.open('No hay tickets pendientes de pago', 'Close', {
              duration: 3000,
            });
            return of(0);
          }

          const totalObservables: Observable<Number>[] = creditLine.sales
            .filter(sale => !sale.payed)
            .map(sale => this.ticketService.getTotal(sale.ticket.reference));

          return forkJoin(totalObservables).pipe(
            map(totals => totals.reduce((acc, curr) => acc.valueOf() + curr.valueOf(), 0))
          );
        })
      );

      this.unpaidTickets.subscribe(total => {
        this.total = total.valueOf();
      });
    }

    pay(mobile: string): void {
      this.cashierService.readState().subscribe((cashierState: CashierState) => {
        if (cashierState.opened) {
          if (this.card === true) {
            this.creditLineService.payUnpaidTicketsFromCreditLine(this.mobile, "card");
          } else if (this.cash === true) {
            this.creditLineService.payUnpaidTicketsFromCreditLine(this.mobile, "cash");
          }
          this.snackBar.open('Pay successfully', 'Close', {
            duration: 3000,
          });
          this.total = 0;
        } else {
          this.snackBar.open('La caja está cerrada, no se puede procesar el pago', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']

          });
        }
      });
    }


    changePayMethod(method: string): void{
      if (method == "cash") {
        this.cash = true;
        this.card = false;
      } else {
        this.cash = false;
        this.card = true;
      }
    }


  }
