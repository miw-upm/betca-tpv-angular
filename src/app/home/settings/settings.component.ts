import { Component } from '@angular/core';

import {User} from "@core/user.model";
import {AuthService} from "@core/auth.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SettingsSavedInfoDialogComponent} from "./settings-saved-info-dialog/settings-saved-info-dialog.component";
import {CustomerPoints} from "@shared/models/customer-points.model";
import {Observable} from "rxjs";
import {CustomerPointsService} from "../customer-points/customer-points.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userHasChanged:boolean=false;
  initialUser:User;
  currentUser:User;
  customerPoints: Observable<CustomerPoints>;
  constructor(private authService: AuthService, private customerPointsService:CustomerPointsService,public dialog: MatDialog) {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userHasChanged=false;
    this.currentUser=this.authService.getUser();
    this.initialUser={ ...this.authService.getUser() };
    this.customerPoints = this.customerPointsService.getCurrentCustomerPoints();
  }

  onChange(){
    if(this.currentUser.name!=this.initialUser.name
      || this.currentUser.mobile!=this.initialUser.mobile){
      this.userHasChanged=true;
    }
    else{
      this.userHasChanged=false;
    }
  }

  saveProfileInfo(){
    this.getCurrentUser();
    const dialogRef:MatDialogRef<SettingsSavedInfoDialogComponent>  =this.dialog.open(SettingsSavedInfoDialogComponent,{ width: '300px'});
  }
}
