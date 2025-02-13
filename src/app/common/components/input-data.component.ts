import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
    standalone: true,
    imports: [MatFormField, MatIcon, MatIconButton, MatLabel, FormsModule, MatInput, MatSuffix, ReactiveFormsModule],
    selector: 'app-input-data',
    templateUrl: 'input-data.component.html',
})
export class InputData {
    @Input() title: string = 'Input text';
    @Input() icon: string = 'add_circle';
    @Input() type: string = 'text';
    @Input() model: string = '';
    @Output() action = new EventEmitter<string>();

    control = new FormControl('');

    submit() {
        if (this.control.value) {
            this.action.emit(this.control.value);
            this.control.reset();
        }
    }
}