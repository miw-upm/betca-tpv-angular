export class Advertising {
  reference: string;
  articleBarcode: string;
  userMobile: string;
  discount: number;
  expiryDate: Date
  constructor() {
    this.reference= '';
    this.articleBarcode= '';
    this.userMobile= '';
    this.discount= 0;
    this.expiryDate= new Date();
  }
}
