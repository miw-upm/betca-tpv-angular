import {Component, EventEmitter, Output} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import _moment, {Moment} from 'moment';
import { default as _rollupMoment } from 'moment';
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {SEARCH_PERIOD, SearchCriteria} from "../search-criteria.model";

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-picker',
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
  templateUrl: './month-picker.component.html',
  styleUrl: './month-picker.component.css'
})
export class MonthPickerComponent {
  @Output() valueChanged = new EventEmitter<SearchCriteria>();
  protected date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const newValue = this.date.value ?? moment();
    newValue.month(normalizedMonthAndYear.month());
    newValue.year(normalizedMonthAndYear.year());
    this.date.setValue(newValue);
    datepicker.close();
    this.valueChanged.emit({period: SEARCH_PERIOD.MONTH, start_date: newValue});
  }

  setCurrentMonth() {
    const newValue = moment();
    const now = moment();
    newValue.year = now.year;
    newValue.month = now.month;
    this.date.setValue(newValue);
    this.valueChanged.emit({period: SEARCH_PERIOD.MONTH, start_date: newValue});
  }
}
