import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
    standalone: true,
    imports: [MatFormField, MatIcon, MatIconButton, MatLabel, FormsModule, MatInput, MatSuffix, ReactiveFormsModule],
    selector: 'app-input-text',
    templateUrl: 'input-text.component.html',
})
export class InputText {
    @Input() title: string = 'Input text';
    @Input() icon: string = 'add_circle';
    @Output() action = new EventEmitter<string>();

    control = new FormControl('');

    submit(value: string ) {
        this.action.emit(value);
        this.control.reset();
    }
}