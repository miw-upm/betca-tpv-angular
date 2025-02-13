import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatInput} from '@angular/material/input';
import {of} from 'rxjs';

@Component({
    standalone: true,
    imports: [MatFormField, MatIcon, MatAutocomplete, MatOption, AsyncPipe, MatIconButton, MatLabel, MatTooltip,
        FormsModule, MatAutocompleteTrigger, MatInput, MatSuffix, NgIf, NgFor],
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent {
    @Input() title = 'Search';
    @Input() key: string;
    @Input() keys = of([]);
    @Input({transform: booleanAttribute}) obligatory = false;

    @Output() keyChange = new EventEmitter<string>();
    @Output() renew = new EventEmitter<any>();
    @Output() selected = new EventEmitter<string>();

    onRenew(): void {
        this.renew.emit();
    }

    resetKey(): void {
        this.key = '';
        this.keyChange.emit(this.key);
    }

    onClick(value): void {
        this.selected.emit(value);
    }

    public onChange(value: string): void {
        this.keyChange.emit(value);
    }

    trackOption(index: number, option: any): any {
        return option;
    }
}
