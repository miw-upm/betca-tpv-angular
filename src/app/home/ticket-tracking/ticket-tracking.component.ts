import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ticket-tracking',
  templateUrl: './ticket-tracking.component.html',
  styleUrls: ['./ticket-tracking.component.css']
})
export class TicketTrackingComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params["id"]);
  }

}
