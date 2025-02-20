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
import { Observable } from 'rxjs';
import { RgpdType } from '@core/models/rgpd-type.model';
import { ColumnData } from './column-data.model';

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

  filteredRgpds$: Observable<ColumnData[]> = this._dataProtectionService.getFilteredRgpdList(this.rgpdFilter);

  create(): void {
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

  update(columnData: ColumnData): void {
    this._dataProtectionService.read(columnData.userMobile).subscribe((fullColumnData) => {
      this._dialog.open(DataProtectionUpdateComponent, { data: fullColumnData });
    });
  }

  delete(columnData: ColumnData): void {
    this._dataProtectionService.delete(columnData.userMobile);
    this.refreshList();
  }

  refreshList(): void {
    this.filteredRgpds$ = this._dataProtectionService.getFilteredRgpdList(this.rgpdFilter);
  }

  clearField(field: keyof RgpdFilter): void {
    this.rgpdFilter[field] = '';
    this.refreshList();
  }

  clearAllFilters(): void {
    this.rgpdFilter = { user: '', mobile: '', type: '' };
    this.refreshList();
  }
}
