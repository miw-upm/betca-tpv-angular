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
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  title = "Tag Management";
  tags$: Observable<Tag[]>;
  displayedColumns: string[] = ['name', 'group', 'description', 'actions'];
  
  tagSearch: TagSearch = {
    name: '',
    group: '',
    description: ''
  };

  constructor(
    private readonly dialog: MatDialog,
    private readonly tagsService: TagsService,
    private readonly authService: AuthService
  ) {
    this.tags$ = of([]);
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.tags$ = this.tagsService.search();
  }

  create(): void {
    const dialogRef = this.dialog.open(TagsCreationComponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search();
      }
    });
  }

  read(tag: Tag): void {
    this.dialog.open(TagsViewingComponentComponent, {
      data: tag
    });
  }

  update(tag: Tag): void {
    const dialogRef = this.dialog.open(TagUpdatedComponent, {
      width: '500px',
      data:{ tag }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search();
      }
    });
  }

  delete(tag: Tag): void {
    if (!tag || !tag.id) {
      console.error('Cannot delete tag without ID:', tag);
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar el tag "${tag.name}"?`)) {
      this.tagsService.delete(tag.id).subscribe({
        next: () => {
          this.search(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error deleting tag:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      });
    }
  }
}
