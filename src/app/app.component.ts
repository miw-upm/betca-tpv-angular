import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterOutlet],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
}
