export interface Cashier {
  id: string;
  initialCash: number;
  cashSales: number;
  cardSales: number;
  usedVouchers: number;
  deposit: number;
  withdrawal: number;
  comment: string;
  lostCard?: number;
  lostCash?: number;
  finalCash: number;
  openingDate: string; // Formato ISO 8601 (ej. "2023-05-10T08:00:00")
  closureDate?: string; // Formato ISO 8601 (ej. "2023-05-11T17:30:00")
}
