import {environment} from '@env';

export class EndPoints {
    static readonly PROVIDERS = environment.REST_CORE + '/providers';
    static readonly ARTICLES = environment.REST_CORE + '/articles';
    static readonly CASHIERS = environment.REST_CORE + '/cashiers';
    static readonly CASHIERS_LAST = EndPoints.CASHIERS + '/last';
    static readonly CASHIERS_CASH_MOVEMENT = EndPoints.CASHIERS + '/cash-movement';
    static readonly TICKETS = environment.REST_CORE + '/tickets';
    static readonly COMPLAINTS = environment.REST_CORE + '/complaints';
    static readonly RGPDS = environment.REST_CORE + '/rgpds';
}
