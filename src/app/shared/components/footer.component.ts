import {Component} from '@angular/core';
import {environment} from '@env';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
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
