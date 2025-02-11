import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Observable} from 'rxjs';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';
import {MatIconButton} from '@angular/material/button';
import {MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-crud',
  standalone:true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatTable,
    NgIf,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatColumnDef,
    MatHeaderCell,
    UppercaseWords,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    NgForOf,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatSort
  ],
  templateUrl: 'crud.component.html'
})
export class CrudComponent {

  @Input() title = 'Management';
  @Input() createAction = true;
  @Input() readAction = true;
  @Input() updateAction = true;
  @Input() deleteAction = true;
  @Output() create = new EventEmitter<any>();
  @Output() read = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;
  columns: Array<string>;
  columnsHeader: Array<string>;

  @Input()
  set data(data: Observable<any[]>) {
    data.subscribe(dataValue => {
      const columnsSet: Set<string> = new Set();
      this.dataSource = new MatTableDataSource<any>(dataValue);
      if (dataValue) {
        dataValue.forEach(obj => Object.getOwnPropertyNames(obj)
          .forEach(column => columnsSet.add(column))
        );
        this.columns = Array.from(columnsSet);
      } else {
        this.columns = [];
      }
      columnsSet.add('actions');
      this.columnsHeader = Array.from(columnsSet);
    });
  }

  onRead(item): void {
    this.read.emit(item);
  }

  onCreate(): void {
    this.create.emit();
  }

  onUpdate(item): void {
    this.update.emit(item);
  }

  onDelete(item): void {
    this.delete.emit(item);
  }

  isArray(obj: any) {
    return Array.isArray(obj)
  }

}
