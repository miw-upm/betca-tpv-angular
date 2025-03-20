import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';

import {SearchComponent} from '@common/components/search.component';
import {SharedArticleService} from "../../shared/services/shared.article.service";

@Component({
    standalone: true,
    imports: [SearchComponent],
    selector: 'app-barcodes-by-userlogged',
    templateUrl: './search-barcodes-by-userlogged.component.html'
})
export class SearchBarcodesByUserloggedComponent {
    barcodes: Observable<number[]> = of([]);

    @Input() barcode: string;
    @Output() add = new EventEmitter<string>();

    constructor(private readonly sharedArticleService: SharedArticleService) {
    }

    public onSelect(value): void {
        this.add.emit(value);
    }

    searchBarcodePurchasedByUserLogged(): void {
        this.barcodes = this.sharedArticleService.searchBarcodePurchasedByUserLogged(this.barcode);
    }
}
