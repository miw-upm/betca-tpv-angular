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
import {DateInterval} from "../date-interval.model";
import {AnimationDurations} from "@angular/material/core";

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
  @Output() valueChanged = new EventEmitter<DateInterval>();
  protected date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const newValue = this.date.value ?? moment();
    newValue.set('y', normalizedMonthAndYear.year());
    newValue.set('M', normalizedMonthAndYear.month());
    this.date.setValue(newValue);
    datepicker.close();
    this.emitValueChanged(newValue);
  }

  setCurrentMonth() {
    const newValue = moment();
    this.date.setValue(newValue);
    this.emitValueChanged(newValue);
  }

  emitValueChanged(date: Moment) {
    date.set('D',1);
    this.valueChanged.emit({start: date, end: date.clone().add(1, 'months')});
  }
}
