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
import { RgpdDto } from '../rgpd-dto.model';

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
  rgpdDto: RgpdDto;
  rgpdTypes = Object.values(RgpdType);
  users$: Observable<User[]>;
  fileName: string = '';
  isCreated: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { isCreated: boolean; rgpdDto: RgpdDto }) {
    this.isCreated = data.isCreated;
    this.title = this.isCreated ? 'Create Data Protection' : 'Update Data Protection';
    this.rgpdDto = { ...data.rgpdDto };

    if (this.isCreated) {
      // TODO this.users$ = this._dataProtectionService.getAllUserWithoutRgpdSigned();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          this.rgpdDto.agreement = this.encodeBase64(new Uint8Array(reader.result));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  save(): void {
    if (!this.isSaveEnabled()) return;
    this.closeDialogWithDto(this.rgpdDto);
  }

  close(): void {
    this._dialogRef.close({ isCancel: true });
  }

  isSaveEnabled(): boolean {
    return !!this.rgpdDto.userName && !!this.rgpdDto.userMobile && !!this.rgpdDto.agreement;
  }

  private closeDialogWithDto(rgpdDto: RgpdDto): void {
    this._dialogRef.close({ isCancel: false, rgpdDto });
  }

  private encodeBase64(buffer: Uint8Array): string {
    return btoa(String.fromCharCode(...buffer));
  }
}
