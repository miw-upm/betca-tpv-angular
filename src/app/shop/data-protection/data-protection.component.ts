import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {DataProtectionService} from "./data-protection.service";
import {DataProtectionCreationUpdatingDialogComponent} from "./data-protection-creation-updating-dialog.component";
import {DataProtectionSearch} from "./data-protection-search.model";
import {Rgpd} from "../shared/services/models/rgpd.model";

@Component({
  templateUrl: 'data-protection.component.html'
})
export class DataProtectionComponent implements OnInit{
  userMobile: number;
  rgpdSearch: DataProtectionSearch;
  title = 'Data protection management';
  rgpds = of([]);
  user = of([]);

  constructor(private dialog: MatDialog, private dataProtectionService: DataProtectionService) {
    this.resetSearch();
  }

  ngOnInit(){
    this.updateList();
  }

  updateList(){
    this.rgpds = this.dataProtectionService.getAllRgpd();
  }
  create(): void {
    this.dialog.open(DataProtectionCreationUpdatingDialogComponent).afterClosed().subscribe(result => {
      this.updateList();
    });
  }

  update(rgpd: Rgpd): void {
    this.dataProtectionService.read(rgpd.user.mobile)
      .subscribe(fullRgpd => this.dialog.open(DataProtectionCreationUpdatingDialogComponent, {data: fullRgpd}));
  }

  read(rgpd: Rgpd): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Data protection Details',
        object: this.dataProtectionService.read(rgpd.user.mobile)
      }
    });
  }

  resetSearch(): void {
    this.rgpdSearch = {};
    this.updateList();
  }

  delete(rgpd : Rgpd): void {
    this.dataProtectionService
      .delete(rgpd.user.mobile)
      .subscribe(success => {
        if(success) {
          this.updateList();
        }
      });
  }

  search():void{
    this.rgpds = this.dataProtectionService.search(this.rgpdSearch);
  }

  downloadFile() {
    //TODO
  }

}
