import {Component, OnInit} from '@angular/core';
import {QuarterVatService} from './quarter-vat.service';
import {QuarterVatResult} from './quarter-vat.model';
import {MatTableDataSource} from "@angular/material/table";
import {Tax} from "../shared/services/models/Tax";

@Component({
  selector: 'app-quarter-vat',
  templateUrl: './quarter-vat.component.html',
  styleUrls: ['./quarter-vat.component.css']
})

export class QuarterVatComponent implements OnInit {
  selectedYear: number;
  selectedQuarter: number;
  yearRange: number[] = [];
  vatResult: QuarterVatResult | null = null;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['taxRate', 'baseTax', 'valueTax'];

  constructor(private quarterVatService: QuarterVatService) {
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

  calculateVat() {
    if (this.selectedYear && this.selectedQuarter) {
      this.quarterVatService.getVatDataForQuarter(this.selectedYear, this.selectedQuarter)
        .subscribe(data => {
          this.vatResult = data;

          if (this.vatResult) {
            const taxRows = Object.keys(this.vatResult.taxes).map(taxKey => {
              const taxInfo = this.vatResult.taxes[taxKey];
              return {
                taxRate: `${this.getTaxName(+taxKey)} (${this.getTaxPercentage(+taxKey)}%)`,
                baseTax: taxInfo.baseTax,
                valueTax: taxInfo.valueTax
              };
            });

            const totalRow = {
              taxRate: 'Total',
              baseTax: this.vatResult.totalBaseTax,
              valueTax: this.vatResult.totalValueTax
            };

            this.dataSource.data = [...taxRows, totalRow];
          }
        });
    }
  }

  getQuarterDateRange(): string {
    if (!this.vatResult) {
      return '';
    }

    const quarter = parseInt(this.vatResult.quarter, 10);
    switch (quarter) {
      case 1:
        return '(January 1st to March 31st)';
      case 2:
        return '(April 1st to June 30th)';
      case 3:
        return '(July 1st to September 30th)';
      case 4:
        return '(October 1st to December 31st)';
      default:
        return '';
    }
  }

  getTaxName(taxKey: number): string {
    return Tax[taxKey];
  }

  getTaxPercentage(taxKey: number): number {
    switch(taxKey) {
      case 0:
        return 21;
      case 1:
        return 10;
      case 2:
        return 4;
      default:
        return 0;
    }
  }

}
