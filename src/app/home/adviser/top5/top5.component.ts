import { Component, OnInit } from '@angular/core';
import {SlideInterface} from "@shared/components/carousel/slide.interface";

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css']
})
export class Top5Component implements OnInit {

  //MockUp
  slides : SlideInterface[] = [
    {description:"Producto 1", strip:"Top 1", url: null},
    {description:"Producto 2", strip:"Top 2", url: null},
    {description:"Producto 3", strip:"Top 3", url: null},
    {description:"Producto 4", strip:"Top 4", url: null},
    {description:"Producto 5", strip:"Top 5", url: null},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
