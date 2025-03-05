import {Component, Inject, OnInit} from '@angular/core';
import {TicketCreation} from './ticket-creation.model';
import {ShoppingCartService} from './shopping-cart.service';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {CurrencyPipe, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {CustomerPoints, CustomerPointsConstants} from "./customer-points/customer-points.model";
import {CustomerPointsService} from "./customer-points/customer-points.service";
import {VoucherService} from "../../vouchers/vouchers.service"
import {Voucher} from "../../shared/models/voucher.model";
import {switchMap, take } from 'rxjs';
import {
    CustomerPointsProfileComponent
} from "@common/components/customer-points-profile/customer-points-profile.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    standalone: true,
    templateUrl: 'check-out-dialog.component.html',
    imports: [
        MatDialogTitle,
        CurrencyPipe,
        MatDialogContent,
        NgIf,
        MatIcon,
        MatFormField,
        MatInput,
        MatButton,
        MatIconButton,
        FormsModule,
        MatCheckbox,
        MatDialogActions,
        MatDialogClose,
        MatSuffix,
        CustomerPointsProfileComponent
    ],
    styleUrls: ['check-out-dialog.component.css']
})
export class CheckOutDialogComponent {
    ticketCreation: TicketCreation;
    totalPurchase: number;
    requestedInvoice = false;
    requestedGiftTicket = false;
    requestedDataProtectionAct = false;
    useCustomerPoints = false;
    customerHasPoints: boolean = false;
    customerHasMinimumPoints: boolean = false;
    pointsToUse: number = 0;
    consumedVoucher: Voucher = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) data,
        private readonly dialogRef: MatDialogRef<CheckOutDialogComponent>,
        private readonly shoppingCartService: ShoppingCartService,
        private readonly customerPointsService: CustomerPointsService,
        private readonly voucherService: VoucherService,
        private readonly snackBar: MatSnackBar
    ) {
        this.ticketCreation = {
            cash: 0,
            card: 0,
            voucher: 0,
            shoppingList: data,
            note: '',
            messageGift: '',
            pointsDiscount: 0
        };
        let consumedVoucher:Voucher = null;
        this.total();
    }

    total(): void {
        this.totalPurchase = 0;
        for (const shopping of this.ticketCreation.shoppingList) {
            this.totalPurchase = this.totalPurchase + shopping.total;
        }
        this.totalPurchase = Math.round(this.totalPurchase * 100) / 100;
    }

    format(value: number): number {
        return value || 0; // empty string,NaN,false,undefined,null,0 is: false
    }

    searchUser(mobile: string): void {
        if (mobile) {
            this.customerPointsService.searchCustomerPointsByMobile(Number(mobile))
                .subscribe(
                    points => {
                        if (points) {
                            this.ticketCreation.user = points.user;
                            this.customerHasPoints = true;
                            if (points.value < CustomerPointsConstants.MINIMUM_POINTS_TO_REDEEM) {
                                this.customerHasMinimumPoints = false;
                            } else {
                                this.customerHasMinimumPoints = true;
                            }
                        } else {
                            this.customerHasPoints = false;
                        }
                    },
                    error => {
                        this.snackBar.open("User mobile not found", "Close", {
                            duration: 5000,
                            panelClass: ['snackbar-error']
                        });
                        this.customerHasPoints = false;
                    }
                );
        }
    }

    managedMobile(): boolean {
        return !!this.ticketCreation.user;
    }

    resetMobile(): void {
        this.ticketCreation.user = undefined;
        this.customerHasPoints = false;
        this.useCustomerPoints = false;
        this.resetTotalPurchase()
    }

    unCommitted(): boolean {
        for (const shopping of this.ticketCreation.shoppingList) {
            if (!shopping.state && shopping.amount > 0) {
                return true;
            }
        }
        return false;
    }

    totalCommitted(): number {
        let total = 0;
        for (const shopping of this.ticketCreation.shoppingList) {
            if (shopping.state) {
                total += shopping.total;
            }
        }
        if (this.useCustomerPoints) {
            total -= this.pointsToUse;
        }
        return Math.round(total * 100) / 100;
    }

    warning(): boolean {
        return !this.managedMobile() && this.unCommitted();
    }

    returnedAmount(): number {
        return Math.round(
            (this.format(this.ticketCreation.cash)
                + this.format(this.ticketCreation.card)
                + this.format(this.ticketCreation.voucher)
                - this.totalPurchase) * 100
        ) / 100;
    }

    returnedCash(): number {
        if (this.ticketCreation.cash >= this.returnedAmount()) {
            return this.returnedAmount();
        } else {
            return this.ticketCreation.cash;
        }
    }

    fillCard(): void {
        if (this.returnedAmount() < 0) {
            this.ticketCreation.card = -this.returnedAmount();
        } else {
            this.ticketCreation.card = this.totalPurchase;
            this.ticketCreation.cash = 0;
        }
    }

    fillCash(): void {
        this.ticketCreation.cash = this.format(this.ticketCreation.cash);
        if (this.returnedAmount() < 0 && this.ticketCreation.cash === 0) {
            this.ticketCreation.cash = -this.returnedAmount();
        } else if (this.ticketCreation.cash < 20) {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
        } else if (this.ticketCreation.cash < 50) {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
        } else {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
        }
    }

    consumeVoucher(): void {
        if (typeof this.ticketCreation.voucher == "string") {
            this.voucherService.read(this.ticketCreation.voucher)
                .subscribe(
                    voucher => {
                        if (voucher) {
                            if (voucher.value <= 0 || voucher.dateOfUse !=null ) {
                                this.snackBar.open("Voucher unusable", "Close", {
                                    duration: 5000,
                                    panelClass: ['snackbar-error']
                                });
                                this.ticketCreation.voucher = null;
                            } else {
                                this.consumedVoucher = voucher;
                                this.ticketCreation.voucher = voucher.value;
                            }
                        }
                        else {
                            this.ticketCreation.voucher = null;
                        }
                    },
                    error => {
                        this.snackBar.open("Voucher not found", "Close", {
                            duration: 5000,
                            panelClass: ['snackbar-error']
                        });
                        this.ticketCreation.voucher = null;
                    }
                );
        }
    }

    invalidCheckOut(): boolean {
        return (this.totalPurchase + this.returnedAmount() - this.totalCommitted() < -0.01); // rounding errors
    }

    round(value): any {
        return Math.round(value * 100) / 100;
    }

    pay(): void {
        const originalTotal = this.ticketCreation.shoppingList.reduce((sum, s) => sum + s.total, 0);
        const pointsEarned = Math.round(originalTotal * 0.05);
        const pointsUsed = this.useCustomerPoints ? this.pointsToUse : 0;
        const netDelta = pointsEarned - pointsUsed;
        this.ticketCreation.pointsDiscount = pointsUsed;

        const returned = this.returnedAmount();
        const cash = this.ticketCreation.cash;
        let voucher = 0;
        this.ticketCreation.cash = this.format(this.ticketCreation.cash);
        this.ticketCreation.card = this.format(this.ticketCreation.card);
        this.ticketCreation.voucher = this.format(this.ticketCreation.voucher);
        if (returned > 0) {
            this.ticketCreation.cash -= returned;
        }
        if (this.ticketCreation.cash < 0) {
            voucher = -this.ticketCreation.cash;
            this.ticketCreation.cash = 0;
        }
        if (this.ticketCreation.card > 0) {
            this.ticketCreation.note += ' Pay with card: ' + this.round(this.ticketCreation.card) + '.';
        }
        if (this.ticketCreation.voucher > 0) {
            this.ticketCreation.note += ' Pay with voucher: ' + this.round(this.ticketCreation.voucher) + '.';
        }
        if (this.ticketCreation.cash > 0) {
            this.ticketCreation.note += ' Pay with cash: ' + this.round(cash) + '.';
        }
        if (!this.ticketCreation.note) {
            this.ticketCreation.note += ' No Pay.';
        }
        if (returned > 0) {
            this.ticketCreation.note += ' Return: ' + this.round(returned) + '.';
        }
        if (!this.ticketCreation.messageGift.trim()) {
            this.ticketCreation.messageGift = 'Congratulations';
        }
        if(this.consumedVoucher != null){
            this.voucherService.update(this.consumedVoucher, new Date(), returned)
                .subscribe(
                    voucher => {
                        if (voucher) {
                            this.snackBar.open("Voucher updated:", "Close", {
                                duration: 5000,
                                panelClass: ['snackbar-error']
                            });
                        }
                    },
                    error => {
                        this.snackBar.open("Voucher not updated", "Close", {
                            duration: 5000,
                            panelClass: ['snackbar-error']
                        });
                        this.ticketCreation.voucher = null;
                    }
                );
            if(returned>0){
                let newVoucher: Voucher = {
                    reference: this.consumedVoucher.reference,
                    value: returned,
                    creationDate: new Date(),
                    dateOfUse: null,
                    user: {
                        mobile: this.consumedVoucher.user.mobile,
                        token: ''
                    }
                };
                this.voucherService.create(newVoucher)
                    .subscribe(
                        voucher => {
                            if (voucher) {
                                this.snackBar.open("Voucher created: ", "Close", {
                                    duration: 5000,
                                    panelClass: ['snackbar-error']
                                });
                            }
                        },
                        error => {
                            this.snackBar.open("Voucher not created", "Close", {
                                duration: 5000,
                                panelClass: ['snackbar-error']
                            });
                            this.ticketCreation.voucher = null;
                        }
                    );
            }
            this.consumedVoucher = null;

        }
        if (this.ticketCreation.user) {
            this.customerPointsService.updateCustomerPoints(this.ticketCreation.user, { points: netDelta })
                .pipe(
                    switchMap(() =>
                        this.shoppingCartService.createTicketAndPrintReceipts(
                            this.ticketCreation,
                            voucher,
                            this.requestedInvoice,
                            this.requestedGiftTicket,
                            this.requestedDataProtectionAct,
                            this.useCustomerPoints
                        )
                    )
                )
                .subscribe({
                    next: () => this.dialogRef.close(true),
                    error: (err) => {
                        this.snackBar.open("Failed to update customer points", "Close", {
                            duration: 5000,
                            panelClass: ['snackbar-error']
                        });
                        this.dialogRef.close(true);
                    }
                });
        } else {
            this.shoppingCartService.createTicketAndPrintReceipts(
                this.ticketCreation,
                voucher,
                this.requestedInvoice,
                this.requestedGiftTicket,
                this.requestedDataProtectionAct,
                this.useCustomerPoints
            ).subscribe(() => this.dialogRef.close(true));
        }
    }

    invalidInvoice(): boolean {
        // TODO pendiente de calcular. Hace falta tener al usuario totalmente completado
        return true;
    }

    onGiftTicketChange(): void {
        if (!this.requestedGiftTicket) {
            this.ticketCreation.messageGift = '';
        }
    }

    useCustomerPointsOnTotal(points: CustomerPoints): void {
        let pointsToUse = points.value;

        if (pointsToUse < CustomerPointsConstants.MINIMUM_POINTS_TO_REDEEM) {
            this.customerHasMinimumPoints = false;
            this.snackBar.open("Customer does not have enough points", "Close", {
                duration: 5000,
                panelClass: ['snackbar-error']
            });
            return;
        } else {
            this.customerHasMinimumPoints = true;
        }

        const maxDiscountAllowed = this.totalPurchase * 0.5;
        if (pointsToUse > maxDiscountAllowed) {
            pointsToUse = maxDiscountAllowed;
        }

        this.pointsToUse = pointsToUse;
        this.totalPurchase -= pointsToUse;
        this.totalPurchase = Math.round(this.totalPurchase * 100) / 100;
        this.useCustomerPoints = true;
    }

    onUseCustomerPointsChange(event: MatCheckboxChange): void {
        if (event.checked) {
            this.customerPointsService.customerPoints$.pipe(take(1)).subscribe(points => {
                this.useCustomerPointsOnTotal(points);
            });
        } else {
            this.resetTotalPurchase();
        }
    }

    resetTotalPurchase(): void {
        this.total();
    }
}