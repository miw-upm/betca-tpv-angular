import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";

@Component({
    standalone: true,
    imports: [MatFormField, FormsModule, MatIcon, MatInput, MatIconButton, MatLabel, MatSuffix],
    selector: 'app-filter-input',
    templateUrl: './filter-input.component.html',

    styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent {
    @Input() title: string = 'Filter';
    @Input() value: any = '';
    @Input() type: string = 'text';
    @Output() valueChange = new EventEmitter<string>(); // Para emitir cambios

    clearModel() {
        this.value = undefined;
        this.valueChange.emit(this.value);
    }
}