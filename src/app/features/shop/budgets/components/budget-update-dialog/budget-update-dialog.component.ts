import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { Budget, BudgetRowData } from "../../models/budget";
import { BudgetService } from "../../services/budget.service";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { map, Observable, shareReplay, startWith, switchMap, tap } from "rxjs";
import { CrudComponent } from "@common/components/crud.component";
import { Shopping } from "app/features/shop/cashier-opened/shopping-cart/shopping.model";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-budget-update-dialog",
  imports: [
    MatDialogContent,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    CrudComponent,
    AsyncPipe,
  ],
  templateUrl: "./budget-update-dialog.component.html",
  styleUrl: "./budget-update-dialog.component.css",
})
export class BudgetUpdateDialogComponent {
  budget$: Observable<Budget>;
  shoppingList$: Observable<Shopping[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) private budget: BudgetRowData,
    private readonly budgetService: BudgetService,
    private readonly dialog: MatDialog
  ) {
    this.budget$ = this.budgetService.read(this.budget.id).pipe(shareReplay());
    this.shoppingList$ = this.budget$.pipe(
      startWith([]),
      map((budget: Budget) => budget.shoppingList)
    );
  }

  onDelete(shopping: Shopping) {
    this.shoppingList$ = this.budget$.pipe(
      switchMap((budget: Budget) => {
        const filteredShoppingList = budget.shoppingList.filter(
          (s: Shopping) => s.barcode !== shopping.barcode
        );
        if (filteredShoppingList.length === 0) {
          return this.budgetService.delete(budget.id).pipe(map(() => []));
        }
        return this.budgetService
          .update(budget.id, {
            ...budget,
            shoppingList: filteredShoppingList,
          })
          .pipe(map((budget: Budget) => budget.shoppingList));
      }),
      tap((shoppingList: Shopping[]) => {
        if (shoppingList.length === 0) {
          this.dialog.closeAll();
        }
      })
    );
  }

  onClose() {
    this.dialog.closeAll();
  }
}
