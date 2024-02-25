import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {CashierClosureService} from './cashier-opened/cashier-closure/cashier-closure.service';
import {ProviderService} from './providers/provider.service';
import {SharedArticleService} from './shared/services/shared.article.service';
import {SharedCashierService} from './shared/services/shared.cashier.service';
import {SharedProviderService} from './shared/services/shared.provider.service';
import {ShoppingCartService} from './cashier-opened/shopping-cart/shopping-cart.service';
import {ArticlesComponent} from './articles/articles.component';
import {CashierClosedComponent} from './cashier-closed/cashier-closed.component';
import {CashierOpenedComponent} from './cashier-opened/cashier-opened.component';
import {ShopComponent} from './shop.component';
import {ProvidersComponent} from './providers/providers.component';
import {SearchByCompanyComponent} from './shared/search-by-company.component';
import {ShoppingCartComponent} from './cashier-opened/shopping-cart/shopping-cart.component';
import {ArticleCreationUpdatingDialogComponent} from './articles/article-creation-updating-dialog.component';
import {
  ArticleQuickCreationDialogComponent
} from './cashier-opened/shopping-cart/article-quick-creation-dialog.component';
import {CashierDialogComponent} from './cashier-opened/cashier-closure/cashier-dialog.component';
import {CheckOutDialogComponent} from './cashier-opened/shopping-cart/check-out-dialog.component';
import {ProviderCreationUpdatingDialogComponent} from './providers/provider-creation-updating-dialog.component';
import {ArticleService} from './articles/article.service';
import {ShopRoutingModule} from './shop-routing.module';
import {TicketsComponent} from './cashier-opened/tickets/tickets.component';
import { SalesPeopleComponent } from './sales-people/sales-people.component';
import { SalesPeopleService } from './sales-people/sales-people.service';
import {QuarterVatComponent} from "./quarter-vat/quarter-vat.component";
import {QuarterVatService} from "./quarter-vat/quarter-vat.service";

import { MessengerComponent } from './messenger/messenger.component';
import { MessengerService } from './messenger/messenger.service';
import {TagsComponent} from "./tags/tags.component";
import { TagService} from "./tags/tag.service";
import { TagCreationReadingUpdatingDialogComponent} from "./tags/tag-creation-reading-updating-dialog.component";
import {SearchByBarcodeComponent} from "./shared/search-by-barcode.component";
import {VouchersComponent} from './vouchers/vouchers.component';
import {VoucherReadDetailDialogComponent} from './vouchers/voucher-read-detail.dialog.component';
import {VoucherCreationDialogComponent} from './vouchers/voucher-creation-dialog.component';
import { BudgetsComponent } from './budgets/budgets.component';
import {BudgetsService} from './budgets/budgets.service';
import { InvoiceComponent } from './invoice/invoice.component';
import {InvoiceService} from "./invoice/invoice.service";
import {
  InvoiceCreationDialogComponent
} from "./invoice/invoice-creation-dialog.component";
import {
  InvoiceUpdatingDialogComponent
} from "./invoice/invoice-updating-dialog.component";
import {CreditLineComponent} from "./credit-line/credit-line.component";
import {CreditLineService} from "./credit-line/credit-line.service";
import {OnlineOrdersComponent} from "./online-orders/online-orders.component";
import {StockAuditComponent} from "./stock-audit/stock-audit.component";
import {StockAuditService} from "./stock-audit/stock-audit.service";
import { RefundsComponent } from './refunds/refunds.component';

@NgModule({
  declarations: [
    ArticleCreationUpdatingDialogComponent,
    ArticleQuickCreationDialogComponent,
    ArticlesComponent,
    CashierClosedComponent,
    CashierDialogComponent,
    CashierOpenedComponent,
    CheckOutDialogComponent,
    ProviderCreationUpdatingDialogComponent,
    ProvidersComponent,
    SearchByBarcodeComponent,
    SearchByCompanyComponent,

    ShopComponent,
    ShoppingCartComponent,
    TicketsComponent,
    QuarterVatComponent,
    MessengerComponent,
    TagsComponent,
    TagCreationReadingUpdatingDialogComponent,
    BudgetsComponent,
    InvoiceComponent,
    InvoiceCreationDialogComponent,
    InvoiceUpdatingDialogComponent,
    SalesPeopleComponent,
    VouchersComponent,
    VoucherReadDetailDialogComponent,
    VoucherCreationDialogComponent,
    OnlineOrdersComponent,
    BudgetsComponent,
    StockAuditComponent,
    BudgetsComponent,
    CreditLineComponent,
    RefundsComponent
  ],
  imports: [
    SharedModule,
    ShopRoutingModule,
  ],
  providers: [
    ArticleService,
    CashierClosureService,
    ProviderService,
    SharedArticleService,
    SharedCashierService,
    SharedProviderService,
    ShoppingCartService,
    SalesPeopleService,
    MessengerService,
    QuarterVatService,
    MessengerService,
    TagService,
    BudgetsService,
    InvoiceService,
    BudgetsService,
    CreditLineService,
    BudgetsService,
    StockAuditService
  ],
})
export class ShopModule {
}
