import { Component } from '@angular/core';
import {StaffService} from "./staff.service";

@Component({
  templateUrl: 'staff.component.html',
})
export class StaffComponent {
  title = 'Staff Records Management';
  staffHoursPerDay = [];
  staffHoursPerMonth = [];

  constructor(private staffService: StaffService) {
    this.staffService.mockHoursPerDate().subscribe(data => {
      this.staffHoursPerDay = data;
      this.staffHoursPerMonth = data;
    });
  }

  formatDate(date : Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
