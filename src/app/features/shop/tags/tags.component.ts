import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterInputComponent } from '@common/components/filter-input.component';
import { Tag } from './models/tags.model';
import { AuthService } from '@core/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { TagsCreationComponentComponent } from './components/tags-creating/TagsCreationComponent.component';
import { TagsViewingComponentComponent } from './components/tags-viewing/TagsViewingComponent.component';
import { TagUpdatedComponent } from './components/tags-updated/TagUpdated/TagUpdated.component';
import { TagsService } from './services/tags.service';
import { CommonModule } from '@angular/common';

interface TagSearch {
  name: string;
  group: string;
  description: string;
}

@Component({
  standalone: true,
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    FilterInputComponent
  ]
})
export class TagsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'group', 'description', 'isPopular', 'isOnSale', 'isNew', 'actions'];
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tagsSubject.asObservable();
  currentFilter: 'all' | 'popular' | 'sale' | 'new' = 'all';
  
  tagSearch: TagSearch = {
    name: '',
    group: '',
    description: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private tagsService: TagsService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    switch (this.currentFilter) {
      case 'popular':
        this.tagsService.getPopularTags().subscribe(tags => this.tagsSubject.next(tags));
        break;
      case 'sale':
        this.tagsService.getSaleTags().subscribe(tags => this.tagsSubject.next(tags));
        break;
      case 'new':
        this.tagsService.getNewTags().subscribe(tags => this.tagsSubject.next(tags));
        break;
      default:
        this.tagsService.search(this.tagSearch)
          .subscribe(tags => this.tagsSubject.next(tags));
    }
  }

  setFilter(filter: 'all' | 'popular' | 'sale' | 'new'): void {
    this.currentFilter = filter;
    this.search();
  }

  create(): void {
    const dialogRef = this.dialog.open(TagsCreationComponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagsService.create(result)
          .subscribe(() => this.search());
      }
    });
  }

  view(tag: Tag): void {
    this.dialog.open(TagsViewingComponentComponent, {
      data: tag
    });
  }

  update(tag: Tag): void {
    const dialogRef = this.dialog.open(TagUpdatedComponent, {
      data: tag
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagsService.update(tag.id!, result)
          .subscribe(() => this.search());
      }
    });
  }

  delete(tag: Tag): void {
    if (confirm('Are you sure you want to delete this tag?')) {
      this.tagsService.delete(tag.id!)
        .subscribe(() => this.search());
    }
  }
}
