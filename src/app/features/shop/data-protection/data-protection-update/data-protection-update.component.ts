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
import { RgpdDto } from '../column-data.model';
import { Rgpd } from '@core/models/rgpd.model';

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
  RgpdDto: RgpdDto;
  rgpdTypes = Object.values(RgpdType);
  users$: Observable<User[]>;
  fileName: string = '';
  existingFileName: string = '';
  existingUser: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RgpdDto | null) {
    this.title = data ? 'Update Data Protection' : 'Create Data Protection';
    this.RgpdDto = data ? { ...data } : this.createNewRgpdDto();

    if (data) {
      this.existingFileName = this.extractFileName(data.agreement);

      this._dataProtectionService.getUserByMobile(data.userMobile).subscribe((user) => {
        if (user) {
          this.existingUser = user;
        } else {
          console.error('No se encontró el usuario con móvil', data.userMobile);
        }
      });
    } else {
      this.users$ = this._dataProtectionService.getAllUserWithoutRgpdSigned();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const userNameFormatted = this.RgpdDto.userName.replace(/\s+/g, '_');
      this.fileName = `rgpd_${userNameFormatted}.pdf`;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          this.RgpdDto.agreement = new Uint8Array(reader.result);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  createOrUpdate(): void {
    this.data ? this.updateRgpd() : this.createRgpd();
  }

  close(): void {
    this._dialogRef.close(true);
  }

  isSaveEnabled(): boolean {
    return !!this.RgpdDto.userName && !!this.RgpdDto.userMobile && this.RgpdDto.agreement?.length > 0;
  }

  private updateRgpd(): void {
    if (!this.existingUser) {
      console.error('Error: No se encontró el usuario antes de actualizar.');
      return;
    }

    const updatedRgpd: Rgpd = {
      type: this.RgpdDto.type as RgpdType,
      agreement: this.RgpdDto.agreement,
      user: this.existingUser,
    };

    this._dataProtectionService.update(updatedRgpd).subscribe(() => {
      this.close();
    });
  }

  private createRgpd(): void {
    if (!this.isSaveEnabled()) return;

    this._dataProtectionService.create({
        type: this.RgpdDto.type as RgpdType,
        agreement: this.RgpdDto.agreement,
        user: { name: this.RgpdDto.userName, mobile: this.RgpdDto.userMobile, token: '', role: undefined },
      })
      .subscribe({
        next: () => {
          this.close();
        },
        error: (err) => {
          console.error(`Error al crear RGPD: `, err);
        }
      });
}

  private extractFileName(data: Uint8Array): string {
    return data.length ? 'existing_agreement.pdf' : '';
  }

  private createNewRgpdDto(): RgpdDto {
    return {
      type: RgpdType.BASIC,
      agreement: new Uint8Array(),
      userName: '',
      userMobile: 0,
    };
  }
}
