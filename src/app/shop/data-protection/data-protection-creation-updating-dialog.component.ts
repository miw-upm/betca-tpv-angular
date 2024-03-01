import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DataProtectionService} from "./data-protection.service";
import {RgpdType} from "../shared/services/models/RgpdType";
import {Rgpd} from "../shared/services/models/rgpd.model";

@Component({
  templateUrl: 'data-protection-creation-updating-dialog.component.html',
  styleUrls: ['data-protection-creation-updating-dialog.component.css']
})

export class DataProtectionCreationUpdatingDialogComponent {
  rgpdTypes = Object.keys(RgpdType).filter(key => isNaN(Number(key)));
  rgpd: Rgpd;
  title: string;
  oldUserMobile: number;
  isMobileCheckAndValid : boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: Rgpd, private dataProtectionService: DataProtectionService, private dialog: MatDialog) {
    this.title = data ? 'Update Data protection' : 'Create Data protection';
    this.rgpd = data ? data : {
      type: RgpdType.BASIC, agreement: undefined, user: {mobile: undefined, token: undefined}
    };
    this.oldUserMobile = data ? data.user.mobile : undefined;
  }

  isCreate(): boolean {
    return this.oldUserMobile === undefined;
  }

  create(): void {
    if(this.isMobileCheckAndValid){
      this.dataProtectionService
        .create(this.rgpd)
        .subscribe(() => this.dialog.closeAll());
    }
  }

  update(): void {
    this.dataProtectionService
      .update(this.oldUserMobile, this.rgpd)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return !this.rgpd.type || !this.rgpd.agreement?.length || !this.isMobileCheckAndValid;
  }

  check(attr: string): boolean {
    return attr === undefined || attr === null || attr === '';
  }

  checkUser(mobile: number) : void{
    const mobileNumber = +mobile;
    this.dataProtectionService.searchUserByMobile(mobileNumber).subscribe(userExists =>{
      this.isMobileCheckAndValid = userExists!=null;
    })
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.rgpd.agreement = new Uint8Array(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  }

}
