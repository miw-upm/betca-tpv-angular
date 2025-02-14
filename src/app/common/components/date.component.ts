import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    standalone: true,
    imports: [DatePipe, NgIf, AsyncPipe],
    selector: 'app-date',
    template: `<a *ngIf="date$ | async as date">{{ date | date: 'medium' }}</a>`,
    styles: [`
        a { padding: 0 10px; }
        @media screen and (max-width: 700px) {
            a { display: none; }
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent {
    date$: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()));
}
