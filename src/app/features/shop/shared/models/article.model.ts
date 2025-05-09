import { Tag } from '../../tags/models/tags.model';
import { Tax } from './Tax';

export interface Article {
    id?: string;
    barcode?: string;
    description: string;
    retailPrice: number;
    stock?: number;
    providerCompany?: string; 
    tax: Tax; 
    provider?: string;
    discontinued?: boolean;
    registrationDate?: Date;
    tagIds?: string[];  
    tags?: Tag[];       
}
