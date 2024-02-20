import {Tax} from "../shared/services/models/Tax";

export interface VatDetail {
  baseTax: number;
  valueTax: number;
}

export interface QuarterVatResult {
  year: number;
  quarter: string;
  taxes: {
    [K in keyof typeof Tax]?: K extends 'FREE' ? never : VatDetail;
  };
  totalBaseTax: number;
  totalValueTax: number;
}
