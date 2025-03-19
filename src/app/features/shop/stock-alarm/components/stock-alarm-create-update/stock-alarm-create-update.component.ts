import {Component, Inject} from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {StockAlarmService} from "../../services/stock-alarm-service";
import {StockAlarm} from "../../models/stock-alarm.model";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-stock-alarm-create-update',
    imports: [
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        FormsModule,
        MatDialogTitle,
        NgIf
    ],
    templateUrl: './stock-alarm-create-update.component.html',
    styleUrl: './stock-alarm-create-update.component.css',
    standalone: true
})
export class StockAlarmCreateUpdateComponent {
    stockAlarm: StockAlarm;
    title: string;
    oldName: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: StockAlarm, public dialog: MatDialog, private stockAlarmService: StockAlarmService) {
        this.title = data ? 'Update Stock Alarm' : 'Create Stock Alarm';
        this.stockAlarm = data || {
            name: undefined, description: undefined, warning: undefined, critical: undefined
        };
        this.oldName = data ? data.name : undefined;
    }

    create() {
        this.stockAlarmService
            .create(this.stockAlarm)
            .subscribe(() => {
                this.dialog.closeAll();
            });
    }

    update() {
        this.stockAlarmService
            .update(this.oldName, this.stockAlarm)
            .subscribe(() => {
                this.dialog.closeAll();
            });
    }

    isCreate(): boolean {
        return this.oldName === undefined;
    }

    invalid(): boolean {
        return this.check(this.stockAlarm.name) || this.check(this.stockAlarm.description)
        || this.checkNumber(this.stockAlarm.warning)  || this.checkNumber(this.stockAlarm.critical);
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }

    checkNumber(attr: number): boolean {
        return attr === undefined || attr === null || isNaN(attr);
    }
}