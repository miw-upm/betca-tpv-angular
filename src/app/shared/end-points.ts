import {environment} from '@env';

export class EndPoints {
  static PROVIDERS = environment.REST_CORE + '/providers';
  static ARTICLES = environment.REST_CORE + '/articles';
  static CASHIERS = environment.REST_CORE + '/cashiers';
  static CASHIERS_LAST = EndPoints.CASHIERS + '/last';
  static TICKETS = environment.REST_CORE + '/tickets';
  static COMPLAINTS = environment.REST_CUSTOMER_SUPPORT + '/complaints';
}
