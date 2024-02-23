import { Component } from '@angular/core';
import {StaffService} from "./staff.service";


@Component({
  templateUrl: 'staff.component.html',
})
export class StaffComponent {
  title = 'Staff Records Management';

  constructor(private staffService: StaffService) {
  }
}
