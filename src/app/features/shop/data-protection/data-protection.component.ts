import { Component, inject } from '@angular/core';
import { CrudComponent } from '@common/components/crud.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ReadDetailDialogComponent } from '@common/dialogs/read-detail.dialog.component';
import { RgpdFilter } from './rgpd-filter.model';
import { DataProtectionService } from './data-protection.service';
import { DataProtectionUpdateComponent } from './data-protection-update/data-protection-update.component';
import { map, Observable, take } from 'rxjs';
import { RgpdType } from '@core/models/rgpd-type.model';
import { RgpdDto } from './rgpd-dto.model';

@Component({
  selector: 'app-data-protection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    CrudComponent,
  ],
  templateUrl: 'data-protection.component.html',
  styleUrls: ['data-protection.component.css'],
})
export class DataProtectionComponent {
  private _dataProtectionService = inject(DataProtectionService);
  private _dialog = inject(MatDialog);

  title = 'Data protection management';

  rgpdTypes = Object.values(RgpdType);

  rgpdFilter: RgpdFilter = {
    user: '',
    mobile: '',
    type: '',
  };

  filteredRgpds$: Observable<Partial<RgpdDto>[]> = this._dataProtectionService
    .getAllRgpd()
    .pipe(map((rgpds: RgpdDto[]) => rgpds.map(({ agreement, ...rest }) => rest)));

  read(rgpd: any): void {
    this._dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Data protection Details',
        object: this._dataProtectionService.read(rgpd.mobile),
      },
    });
  }

  create(): void {
    this.downloadRGPD();
    if (!this._dialog.openDialogs.length) {
      this._dialog
        .open(DataProtectionUpdateComponent, {
          data: { isCreated: true, rgpdDto: this._dataProtectionService.createNewRgpdDtoEmpty() },
        })
        .afterClosed()
        .subscribe((result: { isCancel: boolean; rgpdDto?: RgpdDto }) => {
          if (result && !result.isCancel && result.rgpdDto) {
            this.createRgpd(result.rgpdDto);
          }
        });
    }
  }

  update(rgpdDto: RgpdDto): void {
    if (!this._dialog.openDialogs.length) {
      this._dataProtectionService
        .read(rgpdDto.userMobile)
        .pipe(take(1))
        .subscribe((existingRgpd) => {
          if (existingRgpd) {
            this._dialog
              .open(DataProtectionUpdateComponent, { data: { isCreated: false, rgpdDto: existingRgpd } })
              .afterClosed()
              .subscribe((result: { isCancel: boolean; rgpdDto?: RgpdDto }) => {
                if (result && !result.isCancel && result.rgpdDto) {
                  this.updateRgpd(result.rgpdDto);
                }
              });
          }
        });
    }
  }

  private createRgpd(rgpdDto: RgpdDto): void {
    this._dataProtectionService.create(rgpdDto).subscribe({
      next: () => {
        this.refreshRgpds();
      },
      error: (err) => {
        console.error('Error al crear RGPD:', err);
      },
    });
  }

  private updateRgpd(rgpdDto: RgpdDto): void {
    this._dataProtectionService.update(rgpdDto.userMobile, rgpdDto).subscribe({
      next: () => {
        this.refreshRgpds();
      },
      error: (err) => {
        console.error('Error al actualizar RGPD:', err);
      },
    });
  }

  private downloadRGPD() {
    const pdfUrl = 'assets/rgpd/rgpd_document.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'rgpd_document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private refreshRgpds(): void {
    this.filteredRgpds$ = this._dataProtectionService
      .getAllRgpd()
      .pipe(map((rgpds: RgpdDto[]) => rgpds.map(({ agreement, ...rest }) => rest)));
  }

  // TODO

  delete(columnData: RgpdDto): void {
    // TODO
  }

  clearField(field: keyof RgpdFilter): void {
    this.rgpdFilter[field] = '';
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.rgpdFilter = { user: '', mobile: '', type: '' };
    this.applyFilters();
  }

  applyFilters() {
    // TODO
  }
}
