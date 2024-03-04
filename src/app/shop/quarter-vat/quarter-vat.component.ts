import {Component, OnInit} from '@angular/core';
import {QuarterVatService} from './quarter-vat.service';
import {VATResult} from './quarter-vat.model';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-quarter-vat',
  templateUrl: './quarter-vat.component.html',
  styleUrls: ['./quarter-vat.component.css']
})

export class QuarterVatComponent implements OnInit {
  selectedYear: number;
  selectedQuarter: number;
  yearRange: number[] = [];
  vatResult: VATResult | null = null;
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

  calculateVAT() {
    if (this.selectedYear && this.selectedQuarter) {
      this.quarterVatService.getVatDataForQuarter(this.selectedYear, this.selectedQuarter)
        .subscribe(data => {
          this.vatResult = data;

          if (this.vatResult) {
            const taxRows = [
              {
                taxRate: `Super Reduced (${this.getTaxPercentage(2)}%)`,
                baseTax: this.vatResult.baseTaxSuperReduced,
                valueTax: this.vatResult.valueTaxSuperReduced
              },
              {
                taxRate: `Reduced (${this.getTaxPercentage(1)}%)`,
                baseTax: this.vatResult.baseTaxReduced,
                valueTax: this.vatResult.valueTaxReduced
              },
              {
                taxRate: `General (${this.getTaxPercentage(0)}%)`,
                baseTax: this.vatResult.baseTaxGeneral,
                valueTax: this.vatResult.valueTaxGeneral
              }
            ];

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

    switch (this.vatResult.quarter) {
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

  getTaxPercentage(taxKey: number): number {
    switch (taxKey) {
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
