import { Component, OnInit } from '@angular/core';
import { SalesPeopleSearch1 } from './salesPeople-search1.model';
import { SalesPeopleService } from './sales-people.service';
import {SalesPeopleSearch2} from "./salesPeople-search2.model";
import { Salesperson } from '../shared/services/models/salesPeople.model';
import {forkJoin} from "rxjs";
import {TicketService} from "../cashier-opened/tickets/tickets.service";
@Component({
  selector: 'app-sales-people',
  templateUrl: './sales-people.component.html',
  styleUrls: ['./sales-people.component.css']
})
export class SalesPeopleComponent implements OnInit {

  salesPeopleSearch1 = new SalesPeopleSearch1();
  salesPeopleSearch2 = new SalesPeopleSearch2();
  salesPeople: Salesperson[] = [];
  finalValues: Number[] = [];

  constructor(private salesPeopleService: SalesPeopleService, private ticketService: TicketService) {
  }

  ngOnInit(): void {
  }

  searchBySalesPeopleMobileAndCreationDateBetween() {
    this.salesPeopleService.searchBySalesPeopleMobileAndCreationDateBetween(this.salesPeopleSearch1).subscribe(
      (data) => {
        console.log('Data received:', data);
        this.salesPeople = data;
        const observables = this.salesPeople.map(salesPerson =>
          this.ticketService.getTotal(salesPerson.ticket.reference)
        );

        forkJoin(observables).subscribe(
          (finalValuesArray) => {
            console.log('Final values received:', finalValuesArray);
            this.finalValues = finalValuesArray;
          },
          (error) => {
            console.error('Error fetching final values:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching sales people:', error);
      }
    );
  }
  //NOT IMPLEMENTED
  searchByMonth() {
    this.salesPeopleService.searchByMonth(this.salesPeopleSearch2).subscribe(
      (data) => {
        console.log('Data received:', data);
        this.salesPeople = data;
      },
      (error) => {
        console.error('Error fetching sales people:', error);
      }
    );
  }
  resetSearchBySalesPeopleMobileAndCreationDateBetween(): void {
    this.salesPeopleSearch1.mobile = "";
    this.salesPeopleSearch1.startDate = null;
    this.salesPeopleSearch1.endDate = null;
  }
  resetSearchByMonth(): void {
    this.salesPeopleSearch2.month = "";
  }



}
