import {Component, OnInit} from '@angular/core';
import {StaffService} from "./staff.service";

@Component({
  templateUrl: 'staff.component.html',
  styleUrls: ['staff.component.css']
})
export class StaffComponent implements OnInit {
  title = 'Staff Records Management';
  displayedColumnsForTableDay: string[] = ['day', 'hours'];
  displayedColumnsForTableMonth: string[] = ['month', 'hours'];

  staffHoursPerDay = [];
  staffHoursPerMonth = [];
  monthlyReport = null;

  constructor(private staffService: StaffService) {

  }

  ngOnInit() {
    this.staffService.mockHoursPerDate().subscribe(data => {
      this.staffHoursPerDay = data;
      this.staffHoursPerMonth = data;
    });

    this.staffService.mockMonthlyReport().subscribe(data => {
      this.monthlyReport = data;
    });
  }

  formatDate(date : Date) {
    const dateToFormat = new Date(date);
    return `${dateToFormat.getDate()}/${dateToFormat.getMonth() + 1}/${dateToFormat.getFullYear()}`;
  }
}
