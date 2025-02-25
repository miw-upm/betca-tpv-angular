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
import { Rgpd } from '@core/models/rgpd.model';
import { RgpdFilter } from './rgpd-filter.model';
import { DataProtectionService } from './data-protection.service';
import { DataProtectionUpdateComponent } from './data-protection-update/data-protection-update.component';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RgpdType } from '@core/models/rgpd-type.model';
import { RgpdDto } from './column-data.model';

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

  filteredRgpds$: Observable<Partial<RgpdDto>[]> = this._dataProtectionService.getAllRgpd().pipe(
    map((rgpds: RgpdDto[]) => rgpds.map(({ agreement, ...rest }) => rest))
  );

  create(): void {
    this.downloadRGPD();
    this._dialog
      .open(DataProtectionUpdateComponent)
      .afterClosed()
      .subscribe(() => {
        this.refreshList();
      });
  }

  read(rgpd: any): void {
    this._dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Data protection Details',
        object: this._dataProtectionService.read(rgpd.mobile),
      },
    });
  }

  update(columnData: RgpdDto): void {
    this._dataProtectionService.read(columnData.userMobile).subscribe((fullColumnData) => {
      if (!this._dialog.openDialogs.length) {
        this._dialog
          .open(DataProtectionUpdateComponent, { data: fullColumnData })
          .afterClosed()
          .subscribe(() => {
            console.log('CIERRO');
            this.refreshList();
          });
      }
    });
  }

  delete(columnData: RgpdDto): void {
    this._dataProtectionService.delete(columnData.userMobile);
    this.refreshList();
  }

  refreshList(): void {
    // this._dataProtectionService.getFilteredRgpdList(this.rgpdFilter).subscribe((filteredList) => {
    //   this.filteredRgpds$ = new BehaviorSubject(filteredList).asObservable();
    // });
  }

  clearField(field: keyof RgpdFilter): void {
    this.rgpdFilter[field] = '';
    this.refreshList();
  }

  clearAllFilters(): void {
    this.rgpdFilter = { user: '', mobile: '', type: '' };
    this.refreshList();
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
}
