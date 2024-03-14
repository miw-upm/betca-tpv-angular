import {environment} from '@env';

export class EndPoints {
  static VOUCHERS = environment.REST_CORE + '/vouchers';
  static PROVIDERS = environment.REST_CORE + '/providers';
  static ARTICLES = environment.REST_CORE + '/articles';
  static CASHIERS = environment.REST_CORE + '/cashiers';
  static CASHIERS_LAST = EndPoints.CASHIERS + '/last';
  static TICKETS = environment.REST_CORE + '/tickets';
  static COMPLAINTS = environment.REST_CUSTOMER_SUPPORT + '/complaints';
  static BUDGETS = environment.REST_CORE + '/budgets';
  static CREDIT = environment.REST_CORE + '/credit';
  static MESSENGER = environment.REST_CORE + '/messenger';
  static SLACK: string = environment.REST_CORE + '/slack';
  static ISSUE = environment.REST_CORE +'/issue';
  static TAGS = environment.REST_CORE + '/tags';
  static SALESPEOPLE = environment.REST_CORE + '/salespeople';
  static VAT = environment.REST_CORE + '/vat';
  static ORDERS: string = environment.REST_CORE + '/orders';
  static GIFT_TICKETS = environment.REST_CORE + '/gift-tickets';
  static USERS = environment.REST_USER + "/users";

}
