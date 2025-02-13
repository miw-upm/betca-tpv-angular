import {ShoppingState} from './shopping-state.model';

export class Shopping {
    amount: number = 1;
    discount: number = 0;
    total: number;
    state: ShoppingState = ShoppingState.COMMITTED;

    constructor(public barcode: string, public description: string, public retailPrice: number) {
        this.total = this.retailPrice * this.amount * (1 - this.discount / 100);
    }

    static round2decimal(value: number): number {
        return Math.round(value * 100) / 100;
    }

    updateTotal(): void {
        this.total = Shopping.round2decimal(this.retailPrice * this.amount * (1 - this.discount / 100));
    }

    updateDiscount(): void {
        this.discount = Shopping.round2decimal(100 * (1 - (this.total / (this.amount * this.retailPrice))));
    }

}
