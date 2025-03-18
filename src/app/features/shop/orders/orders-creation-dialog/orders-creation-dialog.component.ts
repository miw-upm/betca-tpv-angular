import {Component, Inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {OrderService} from '../orders.service';
import {SearchByCompanyComponent} from '../../shared/components/search-by-company.component';
import {Order} from '../../shared/models/order.model';
import {OrderLine} from '../../shared/models/order-line.model';
import {SharedShopArticleService} from "../../shared/services/shared-shop.article.service";
@Component({
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatInput,
        SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
        NgForOf, MatDatepickerModule, MatInputModule],
    templateUrl: 'orders-creation-dialog.component.html',
    styleUrls: ['orders-creation-dialog.component.css']
})
export class OrdersCreationDialogComponent {
    order: Order;
    orderLine: OrderLine;
    title: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: Order, private readonly orderService: OrderService,  private readonly sharedArticleService: SharedShopArticleService,
    private readonly dialog: MatDialog) {
        this.title = 'Create Order';
        this.order = data || {
            reference: undefined, description: undefined, providerCompany: undefined, openingDate: undefined,
            closingDate: undefined, orderLinesList: []
        };
    }

    onCompanyChange(): void {
        this.sharedArticleService.getArticlesByCompany(this.order.providerCompany).subscribe(articles => {
            this.order.orderLinesList = articles.map(article => {
                return {
                    articleBarcode: article.barcode,
                    requiredAmount: 0,
                    finalAmount: 0,
                    };
                })
            }
        );
    }

    create(): void {
        this.order.openingDate = new Date();
        this.orderService
            .create(this.order)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return this.check(this.order.description) || this.check(this.order.providerCompany)
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }

}
