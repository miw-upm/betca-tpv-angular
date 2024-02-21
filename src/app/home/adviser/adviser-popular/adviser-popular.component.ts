import { Component, OnInit } from '@angular/core';
import {SlideInterface} from "@shared/components/carousel/slide.interface";

@Component({
  selector: 'app-adviser-popular',
  templateUrl: './adviser-popular.component.html',
  styleUrls: ['./adviser-popular.component.css']
})
export class AdviserPopularComponent implements OnInit {

  //MockUp
  slides : SlideInterface[] = [
    {description:"Producto 1", strip:null, url: null},
    {description:"Producto 2", strip:null, url: null},
    {description:"Producto 3", strip:null, url: null},
    {description:"Producto 4", strip:null, url: null},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
