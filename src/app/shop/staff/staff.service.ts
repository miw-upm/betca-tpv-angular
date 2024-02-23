import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {StaffRecord} from "./staff-record.model";
import {Role} from "@core/role.model";
import {StaffHoursPerDate} from "./staff-hours-per-date.model";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffRecords: StaffRecord[] = [];

  constructor() {
    this.staffRecords.push({
      login: new Date('2024-02-24T08:00:00'),
      logout: new Date('2024-02-24T16:00:00'),
      user: {
        token: 'token1',
        mobile: 1,
        name: 'User1',
        role: Role.MANAGER,
      }
    });

    this.staffRecords.push({
      login: new Date('2024-02-25T09:00:00'),
      logout: new Date('2024-02-25T17:00:00'),
      user: {
        token: 'token2',
        mobile: 2,
        name: 'User2',
        role: Role.OPERATOR
      }
    });
  }

  mockHoursPerDate(): Observable<StaffHoursPerDate[]> {
    let staffHoursPerDates: StaffHoursPerDate[] = [];

    const staffHoursPerDate = {
      user: this.staffRecords[0].user,
      hoursPerDate: [{
        startDate: new Date('2024-02-25T09:00:00'),
        endDate: new Date('2024-02-25T18:00:00'),
        hours: 9
      }]};

    staffHoursPerDates.push(staffHoursPerDate);

    return of(staffHoursPerDates);
  }
}





