export interface VATResult {
  year: number;
  quarter: number;
  baseTaxSuperReduced: number;
  baseTaxReduced: number;
  baseTaxGeneral: number;
  valueTaxSuperReduced: number;
  valueTaxReduced: number;
  valueTaxGeneral: number;
  totalBaseTax: number;
  totalValueTax: number;
}

