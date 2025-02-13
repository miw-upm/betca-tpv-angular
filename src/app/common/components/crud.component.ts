import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
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
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatSort} from '@angular/material/sort';
import {Observable} from 'rxjs';

import {UppercaseWordsPipe} from '../pipes/uppercase-words.pipe';

@Component({
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardContent, MatTable, NgIf, MatHeaderRow, MatHeaderRowDef, MatRowDef,
        MatRow, MatColumnDef, MatHeaderCell, UppercaseWordsPipe, MatCell, MatCellDef, MatHeaderCellDef, NgForOf,
        MatIconButton, MatSuffix, MatIcon, MatSort],
    selector: 'app-crud',
    templateUrl: 'crud.component.html'
})
export class CrudComponent {
    @Input() title = 'Management';
    @Input() createAction = true;
    @Input() readAction = true;
    @Input() updateAction = true;
    @Input() deleteAction = false;
    @Input() printAction = false;
    @Input() runAction = false;
    @Output() create = new EventEmitter<any>();
    @Output() read = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() print = new EventEmitter<any>();
    @Output() run = new EventEmitter<any>();
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

    onPrint(item): void {
        this.print.emit(item);
    }
    onRun(item): void {
        this.run.emit(item);
    }

    isArray(obj: any) {
        return Array.isArray(obj)
    }

}
