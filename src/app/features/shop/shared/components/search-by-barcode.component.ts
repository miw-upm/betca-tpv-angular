import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';

import {SharedArticleService} from '../services/shared.article.service';
import {SearchComponent} from '../../../../common/components/search.component';

@Component({
    standalone: true,
    imports: [SearchComponent],
    selector: 'app-search-by-barcode',
    templateUrl: './search-by-barcode.component.html'
})
export class SearchByBarcodeComponent {
    barcodes: Observable<number[]> = of([]);

    @Input() barcode: string;
    @Output() add = new EventEmitter<string>();

    constructor(private readonly sharedArticleService: SharedArticleService) {
    }

    public onSelect(value): void {
        this.add.emit(value);
    }

    searchByBarcode(): void {
        this.barcodes = this.sharedArticleService.searchBarcode(this.barcode);
    }
}
