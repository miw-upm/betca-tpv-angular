import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Shopping} from "../../shop/cashier-opened/shopping-cart/shopping.model";
import {TicketTrackingService} from "./ticket-tracking.service";

@Component({
  selector: 'app-ticket-tracking',
  templateUrl: './ticket-tracking.component.html',
  styleUrls: ['./ticket-tracking.component.css']
})
export class TicketTrackingComponent implements OnInit {

  id: string;
  products: Shopping[];

  constructor(
    private route: ActivatedRoute,
    private ticketTrackingService: TicketTrackingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params["id"]);
    this.ticketTrackingService.read().subscribe(products => this.products = products);
  }

}
