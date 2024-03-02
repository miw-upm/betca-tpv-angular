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
    {description:"Producto 1", strip:"Top 1", url: null, article: { barcode: '1', description: 'Description 1', retailPrice: 1, providerCompany: 'Provider 1'}},
    {description:"Producto 2", strip:"Top 2", url: null, article: { barcode: '2', description: 'Description 2', retailPrice: 2, providerCompany: 'Provider 2'}},
    {description:"Producto 3", strip:"Top 3", url: null, article: { barcode: '3', description: 'Description 3', retailPrice: 3, providerCompany: 'Provider 3'}},
    {description:"Producto 4", strip:"Top 4", url: null, article: { barcode: '4', description: 'Description 4', retailPrice: 4, providerCompany: 'Provider 4'}},
    {description:"Producto 5", strip:"Top 5", url: null, article: { barcode: '5', description: 'Description 5', retailPrice: 5, providerCompany: 'Provider 5'}},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
