import {User} from "@core/user.model";

export interface StaffHoursPerDate {
  user: User;
  hoursPerDate: HoursPerDate[];
}

export interface HoursPerDate {
  startDate: Date;
  endDate: Date;
  hours: number;
}
