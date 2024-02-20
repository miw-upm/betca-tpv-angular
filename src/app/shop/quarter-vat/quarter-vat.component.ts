import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-quarter-vat',
  templateUrl: './quarter-vat.component.html',
  styleUrls: ['./quarter-vat.component.css']
})

export class QuarterVatComponent implements OnInit {
  selectedYear: number;
  selectedQuarter: number;
  yearRange: number[] = [];

  constructor() {
  }

  ngOnInit() {
    this.initializeYearRange();
  }

  initializeYearRange() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    for (let year = startYear; year <= currentYear; year++) {
      this.yearRange.push(year);
    }
  }

  isFieldRequiredAndTouched(formControlName: string, form: any): boolean {
    const control = form.controls[formControlName];
    return control?.errors?.required && control?.touched;
  }
}
