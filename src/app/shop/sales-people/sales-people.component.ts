import { Component, OnInit } from '@angular/core';
import { SalesPeopleSearch1 } from './salesPeople-search1.model';
import { SalesPeopleService } from './sales-people.service';
import {SalesPeopleSearch2} from "./salesPeople-search2.model";
import { Salesperson } from '../shared/services/models/salesPeople.model';
@Component({
  selector: 'app-sales-people',
  templateUrl: './sales-people.component.html',
  styleUrls: ['./sales-people.component.css']
})
export class SalesPeopleComponent implements OnInit {

  salesPeopleSearch1 = new SalesPeopleSearch1();
  salesPeopleSearch2 = new SalesPeopleSearch2();
  salesPeople: Salesperson[] = [];

  constructor(private salesPeopleService: SalesPeopleService) {
  }

  ngOnInit(): void {
  }

  searchSalesPeople1() {
    this.salesPeopleService.search1(this.salesPeopleSearch1).subscribe(
      (data) => {
        console.log('Data received:', data);
        this.salesPeople = data;
      },
      (error) => {
        console.error('Error fetching sales people:', error);
      }
    );
  }

  searchSalesPeople2() {
    this.salesPeopleService.search2(this.salesPeopleSearch2).subscribe(
      (data) => {
        console.log('Data received:', data);
        this.salesPeople = data;
      },
      (error) => {
        console.error('Error fetching sales people:', error);
      }
    );
  }

  resetSearch1(): void {
    this.salesPeopleSearch1.nameSalesPeople = "";
    this.salesPeopleSearch1.startDate = null;
    this.salesPeopleSearch1.endDate = null;
  }
  resetSearch2(): void {
    this.salesPeopleSearch2.month = "";
  }

}
