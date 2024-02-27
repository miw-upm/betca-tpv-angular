import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Observable, map, of } from 'rxjs';
import {Advertising} from "@shared/models/advertising.model";
import {AdvertisingService} from "./advertising.service";

@Component({
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {

  AdvertisingTitle: string = "Advertising History";

  advertisingHistory: Observable<Advertising[]> = this.advertisingService.getAdvertisingHistory();
  newAdvertising : Advertising = new Advertising();

  constructor(private advertisingService:AdvertisingService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getAdvertisingHistory(): Observable<Advertising[]> {
    return this.advertisingHistory;
  }




}
