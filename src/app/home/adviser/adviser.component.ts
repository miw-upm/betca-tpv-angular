import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
    standalone: true,
    imports: [MatGridList, MatGridTile],
    templateUrl: 'adviser.component.html',
    styleUrls: ['adviser.component.css'],
})
export class AdviserComponent {
}
