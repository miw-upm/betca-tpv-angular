import {Tax} from '../../shop/shared/models/Tax';
import {Tag} from '../../shop/tags/models/tags.model';

export interface Article {
    barcode: string;
    description: string;
    retailPrice: number;
    providerCompany: string;
    reference?: string;
    stock?: number;
    tax?: Tax;
    discontinued?: boolean;
    registrationDate?: Date;
    tag?: Tag;
}
