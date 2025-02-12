import {Observable, of} from 'rxjs';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedArticleService} from './services/shared.article.service';
import {SearchComponent} from '@shared/components/search.component';

@Component({
    selector: 'app-search-by-barcode',
    standalone: true,
    imports: [
        SearchComponent
    ],
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
