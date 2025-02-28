import {Component} from "@angular/core";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {StockAlarmService} from "../../services/stock-alarm-service";

@Component({
    selector: 'app-stock-alarm-create',
    imports: [
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './stock-alarm-create.component.html',
    styleUrl: './stock-alarm-create.component.css',
    standalone: true
})
export class StockAlarmCreateComponent {
    constructor(public dialog: MatDialog, private stockAlarmService: StockAlarmService) { }

    onCreate() {
        this.stockAlarmService.create(null).subscribe(() => {
            this.dialog.closeAll();
        })
    }
}