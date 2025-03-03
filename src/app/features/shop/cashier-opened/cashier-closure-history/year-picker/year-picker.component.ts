import {Component, EventEmitter, Output} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import _moment, {default as _rollupMoment, Moment} from 'moment';
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatFabButton} from "@angular/material/button";
import {DateInterval} from "../date-interval.model";

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
  @Output() valueChanged = new EventEmitter<DateInterval>();
  protected date = new FormControl(moment());

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const newValue = this.date.value ?? moment();
    newValue.set('y',normalizedMonthAndYear.year());
    this.date.setValue(newValue);
    datepicker.close();
    this.emitValueChanged(newValue);
  }

  setCurrentYear() {
    const newValue = moment();
    this.date.setValue(newValue);
    this.emitValueChanged(newValue);
  }

  emitValueChanged(date: Moment) {
    date.set('D',1);
    date.set('M',0);
    this.valueChanged.emit({start: date, end: date.clone().add(1, 'years')});
  }
}
