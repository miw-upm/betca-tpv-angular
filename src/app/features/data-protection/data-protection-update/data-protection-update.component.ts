import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RgpdType } from '@core/models/rgpd-type.model';
import { User } from '@core/models/user.model';
import { DataProtectionService } from '../data-protection.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ColumnData } from '../column-data.model';

@Component({
  selector: 'app-data-protection-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatDialogModule,
  ],
  templateUrl: 'data-protection-update.component.html',
  styleUrls: ['data-protection-update.component.css'],
})
export class DataProtectionUpdateComponent {
  private _dataProtectionService = inject(DataProtectionService);
  private _dialogRef = inject(MatDialogRef<DataProtectionUpdateComponent>);

  title: string;
  columnData: ColumnData;
  rgpdTypes = Object.values(RgpdType);
  users$: Observable<User[]>;
  fileName: string = '';
  existingFileName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: ColumnData | null) {
    this.title = data ? 'Update Data Protection' : 'Create Data Protection';
    this.columnData = data ? { ...data } : this.createNewColumnData();
    if (data) this.existingFileName = this.extractFileName(data.agreement);
    else this.users$ = this._dataProtectionService.getUsers();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          this.columnData.agreement = new Uint8Array(reader.result);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  save(): void {
    if (!this.columnData.userName || !this.columnData.userMobile) return;
    this.data ? this.updateRgpd() : this.createRgpd();
    this._dialogRef.close(true);
  }

  close(): void {
    this._dialogRef.close();
  }

  private extractFileName(data: Uint8Array): string {
    return data.length ? 'existing_agreement.pdf' : '';
  }

  private createNewColumnData(): ColumnData {
    return {
      type: RgpdType.BASIC,
      agreement: new Uint8Array(),
      userName: '',
      userMobile: 0,
    };
  }

  private updateRgpd(): void {
    this._dataProtectionService.update(this.columnData.userMobile, {
      type: this.columnData.type as RgpdType,
      agreement: this.columnData.agreement,
      user: { name: this.columnData.userName, mobile: this.columnData.userMobile, token: '', role: undefined },
    });
  }

  private createRgpd(): void {
    this._dataProtectionService.create({
      type: this.columnData.type as RgpdType,
      agreement: this.columnData.agreement,
      user: { name: this.columnData.userName, mobile: this.columnData.userMobile, token: '', role: undefined },
    });
  }
}
