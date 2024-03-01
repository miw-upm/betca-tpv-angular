import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() barcode: string;
  @Input() description: string;
  @Input() state: number;

  constructor() { }

  ngOnInit(): void {
  }

}
