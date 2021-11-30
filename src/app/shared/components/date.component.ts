import {Component} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-date',
  template: `<a>{{date | date: "medium"}}</a>`,
  styles: [`
    a {
      padding-left: 10px;
      padding-right: 10px;
    }

    @media screen and (max-width: 700px) {
      a {
        visibility: hidden;
        display: none;
      }
    }
  `]
})
export class DateComponent {

  date: Date;

  constructor() {
    timer(0, 1000).subscribe(
      () => this.date = new Date()
    );
  }

}
