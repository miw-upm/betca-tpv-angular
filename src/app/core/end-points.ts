import { environment } from "@env";

export class EndPoints {
  static readonly PROVIDERS = environment.REST_CORE + "/providers";
  static readonly ARTICLES = environment.REST_CORE + "/articles";
  static readonly TAGS = environment.REST_CORE + "/tags";
  static readonly CASHIERS = environment.REST_CORE + "/cashiers";
  static readonly CASHIERS_LAST = EndPoints.CASHIERS + "/last";
  static readonly CASHIERS_CASH_MOVEMENT = EndPoints.CASHIERS + "/cash-movement";
  static readonly CASHIERS_CLOSED_BETWEEN = EndPoints.CASHIERS + "/closed-between";
  static readonly TICKETS = environment.REST_CORE + "/tickets";
  static readonly COMPLAINTS = environment.REST_CORE + "/complaints";
  static readonly RGPDS = environment.REST_CORE + "/rgpds";
  static readonly OFFERS = environment.REST_CORE + "/offers";
  static readonly CUSTOMER_POINTS = environment.REST_CORE + "/customer-points";
  static readonly VOUCHERS = environment.REST_CORE + "/vouchers";
  static readonly STOCK_AUDITS = environment.REST_CORE + "/stock-audits";
  static readonly BUDGETS = environment.REST_CORE + "/budgets";
  static readonly BUDGETS_SEARCH = EndPoints.BUDGETS + "/search";
  static readonly INVOICES = environment.REST_CORE + "/invoices";
  static readonly STOCK_ALARMS = environment.REST_CORE + "/stock-alarms";
  static readonly ORDERS = environment.REST_CORE + "/orders";
  static readonly SLACK = environment.REST_CORE + '/slack';
  static readonly SLACK_PUBLISH = EndPoints.SLACK + '/publish';
  static readonly GIFTTICKETS = environment.REST_CORE + '/gift_tickets';
  static readonly REVIEWS = environment.REST_CORE + '/reviews';
  static readonly CUSTOMER_DISCOUNT = environment.REST_CORE + '/customer-discount';
  static readonly USERS = environment.REST_USER + '/users';
}
