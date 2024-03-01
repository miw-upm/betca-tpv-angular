import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Observable, map, of } from 'rxjs';
import {Advertising} from "@shared/models/advertising.model";
import {AdvertisingService} from "./advertising.service";
import {MatDialog} from "@angular/material/dialog";
import {ReadDetailDialogComponent} from "@shared/dialogs/read-detail.dialog.component";

@Component({
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {

  AdvertisingTitle: string = "Advertising History";
  Advertising : Observable<any> = of([]);

  constructor(private dialog: MatDialog,private advertisingService: AdvertisingService) {
  }

  ngOnInit(): void {
    this.loadAdvertisings();
    }
  loadAdvertisings(): void {
    this.Advertising = this.advertisingService.getAll();
  }
  read(advertising: Advertising):void{
    this.dialog.open(ReadDetailDialogComponent,{
      data:{
        title:'Information',
        object:this.advertisingService.read(advertising.reference)
      }
    });
  }
  delete(advertising: Advertising):void{
    this.advertisingService.delete(advertising.reference).subscribe(() => {
      this.loadAdvertisings();
    });

  }

}
