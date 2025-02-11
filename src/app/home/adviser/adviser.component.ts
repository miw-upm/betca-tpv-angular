import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  standalone:true,
  templateUrl: 'adviser.component.html',
  styleUrls: ['adviser.component.css'],
  imports: [
    MatGridList,
    MatGridTile
  ]
})
export class AdviserComponent {
}
