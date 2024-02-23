import {Component, Inject, OnInit} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-settings-saved-info-dialog',
  templateUrl: './settings-saved-info-dialog.component.html',
  styleUrls: ['./settings-saved-info-dialog.component.css']
})
export class SettingsSavedInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SettingsSavedInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
