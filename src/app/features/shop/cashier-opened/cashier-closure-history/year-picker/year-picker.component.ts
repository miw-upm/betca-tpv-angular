import {Component, EventEmitter, Output} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import _moment, {default as _rollupMoment, Moment} from 'moment';
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {SEARCH_PERIOD, SearchCriteria} from "../search-criteria.model";

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  standalone: true,
  imports: [
    MatDatepicker,
    MatIcon,
    MatDatepickerToggle,
    MatLabel,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatSuffix,
    MatFabButton
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './year-picker.component.html',
  styleUrl: './year-picker.component.css'
})
export class YearPickerComponent {
  @Output() valueChanged = new EventEmitter<SearchCriteria>();
  protected date = new FormControl(moment());

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const newValue = this.date.value ?? moment();
    newValue.year(normalizedMonthAndYear.year());
    this.date.setValue(newValue);
    datepicker.close();
    this.valueChanged.emit({period: SEARCH_PERIOD.YEAR, start_date: newValue});
  }

  setCurrentYear() {
    const newValue = moment();
    newValue.year = moment().year;
    this.date.setValue(newValue);
    this.valueChanged.emit({period: SEARCH_PERIOD.YEAR, start_date: newValue});
  }
}
