import {Observable, of} from 'rxjs';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedProviderService} from './services/shared.provider.service';
import {SearchComponent} from '@shared/components/search.component';

@Component({
  selector: 'app-search-by-company',
  standalone:true,
  imports: [
    SearchComponent
  ],
  templateUrl: './search-by-company.component.html'
})
export class SearchByCompanyComponent {
  companies: Observable<string[]> = of([]);

  @Input() company: string;
  @Output() companyChange = new EventEmitter<string>();

  constructor(private readonly sharedProviderService: SharedProviderService) {
  }

  public onSelect(): void {
    this.companyChange.emit(this.company);
  }

  searchByCompany(): void {
    this.companies = this.sharedProviderService.searchCompanies(this.company);
  }
}
