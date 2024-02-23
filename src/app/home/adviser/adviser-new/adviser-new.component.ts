import { Component, OnInit } from '@angular/core';
import {SlideInterface} from "@shared/components/carousel/slide.interface";

@Component({
  selector: 'app-adviser-new',
  templateUrl: './adviser-new.component.html',
  styleUrls: ['./adviser-new.component.css']
})
export class AdviserNewComponent implements OnInit {

  //MockUp
  slides : SlideInterface[] = [
    {description:"Producto 1", strip:"NEW", url: null},
    {description:"Producto 2", strip:"NEW", url: null},
    {description:"Producto 3", strip:"NEW", url: null},
    {description:"Producto 4", strip:"NEW", url: null},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
