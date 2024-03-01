export interface MonthlyReport {
  month: string;
  hoursPerDay: HoursPerDay[];
}

export interface HoursPerDay {
  day: Date;
  hours: number;
}
