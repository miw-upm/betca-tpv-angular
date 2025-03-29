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
import { Observable, of } from 'rxjs';
import { TagsCreationComponentComponent } from './components/tags-creating/TagsCreationComponent.component';
import { TagsUpdatingComponentComponent } from './components/tags-updating/TagsUpdatingComponent.component';
import { TagsViewingComponentComponent } from './components/tags-viewing/TagsViewingComponent.component';
import { TagsDeletingComponentComponent } from './components/tags-deleting/TagsDeletingComponent.component';
import { TagsService } from './services/tags.service';

interface TagSearch {
  name: string;
  group: string;
  description: string;
}

@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    FilterInputComponent
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  title = "Tag Management";
  tags: Observable<Tag[]>;
  displayedColumns: string[] = ['name', 'group', 'description', 'actions'];
  
  tagSearch: TagSearch = {
    name: '',
    group: '',
    description: ''
  };

  constructor(
    private readonly tagService: TagsService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService
  ) {
    this.tags = of([]);
    this.search();
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.tags = this.tagService.search();
  }

  create(): void {
    const dialogRef = this.dialog.open(TagsCreationComponentComponent);
    dialogRef.afterClosed().subscribe(() => this.search());
  }

  read(tag: Tag): void {
    this.dialog.open(TagsViewingComponentComponent, {
      data: tag
    });
  }

  update(tag: Tag): void {
    if (!tag || !tag.id) {
      console.error('Invalid tag data for update');
      return;
    }
    const dialogRef = this.dialog.open(TagsUpdatingComponentComponent, {
      data: tag,
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search();
      }
    });
  }

  delete(tag: Tag): void {
    const dialogRef = this.dialog.open(TagsDeletingComponentComponent, {
      data: tag
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.search(); // Refresh the list after successful deletion
      }
    });
  }
}
