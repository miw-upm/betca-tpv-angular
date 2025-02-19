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
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Observable, of} from 'rxjs';

import {OrderService} from './orders.service';
import {SearchByCompanyComponent} from '../shared/components/search-by-company.component';
import {Order} from '../shared/models/order.model';
import {OrderLine} from '../shared/models/order-line.model';
import {SharedProviderService} from '../shared/services/shared.provider.service';
@Component({
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput, MatSelect,
        MatOption, MatSlideToggle, SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
        NgForOf, MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle],
    templateUrl: 'orders-creation-updating-dialog.component.html',
    styleUrls: ['orders-creation-updating-dialog.component.css']
})
export class OrdersCreationUpdatingDialogComponent {
    order: Order;
    orderLine: OrderLine;
    title: string;
    oldReference: string;
    companies: Observable<string[]> = of([]);
    selectedCompany: string;
    articles: any[] = [];


    constructor(@Inject(MAT_DIALOG_DATA) data: Order, private readonly orderService: OrderService,  private readonly sharedProviderService: SharedProviderService,        
    private readonly dialog: MatDialog) {
        this.title = data ? 'Update Order' : 'Create Order';
        this.order = data || {
            reference: undefined, description: undefined, providerCompany: undefined, openingDate: undefined,
            closingDate: undefined, orderLines: []
        };
        this.oldReference = data ? data.reference : undefined;

        if(data) {
            this.onCompanyChange();
        }
    }

    onCompanyChange(): void {
        this.sharedProviderService.getArticlesByCompany(this.order.providerCompany).subscribe(articles => {
            this.articles = articles;
        });
    }

    isCreate(): boolean {
        return this.oldReference === undefined;
    }

    create(): void {
        this.order.orderLines = this.articles.map(article => ({
            articleBarcode: article.barcode,
            requiredAmount: article.amount,
            finalAmount: 0,
        }));

        this.orderService
            .create(this.order)
            .subscribe(() => this.dialog.closeAll());
    }

    update(): void {
        this.order.orderLines = this.articles.map(article => ({
            articleBarcode: article.barcode,
            requiredAmount: article.amount,
            finalAmount: 0,
        }));

        this.orderService
            .update(this.oldReference, this.order)
            .subscribe(() => this.dialog.closeAll());
    }

    invalid(): boolean {
        return this.check(this.order.reference) || this.check(this.order.description) || this.check(this.order.providerCompany)
    }

    check(attr: string): boolean {
        return attr === undefined || null || attr === '';
    }

}
