export interface Complaint {
  id?: string;
  mobile?: number;
  barcode: string;
  description: string;
  registrationDate?: Date;
  state: 'open' | 'closed';
  reply?: string;
}
