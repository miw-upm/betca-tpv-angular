import {Component} from '@angular/core';
import {environment} from '@env';
import {MatDivider} from '@angular/material/divider';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone:true,
  templateUrl: './footer.component.html',
  imports: [
    MatDivider,
    MatGridTile,
    MatGridList,
    MatList,
    MatListItem,
    MatIcon,
    MatListSubheaderCssMatStyler,
    NgOptimizedImage
  ],
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  version: string;
  profile: string;
  backEndUser: string;
  backEndCore: string;
  backEndCustomerSupport: string;


  constructor() {
    this.version = environment.VERSION;
    this.profile = environment.production ? 'Prod' : 'Dev';
    this.backEndUser = environment.REST_USER;
    this.backEndCore = environment.REST_CORE;
    this.backEndCustomerSupport = environment.REST_CUSTOMER_SUPPORT;
  }

}
