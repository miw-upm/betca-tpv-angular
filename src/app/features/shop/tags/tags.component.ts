import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { SearchByCompanyComponent } from '../shared/components/search-by-company.component';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CrudComponent } from '@common/components/crud.component';
import { FilterInputComponent } from '@common/components/filter-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Tag } from './models/tags.model';
import { AuthService } from '@core/services/auth.service';
import { of } from 'rxjs';
import { ReadDetailDialogComponent } from '@common/dialogs/read-detail.dialog.component';
import { TagsCreationComponentComponent } from '../tags/components/tags-creating/TagsCreationComponent.component';
import { TagsUpdatingComponentComponent } from '../tags/components/tags-updating/TagsUpdatingComponent.component';
import { TagsService } from './services/tags.service';

@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [
    MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput, MatSelect,
    MatOption, MatSlideToggle, SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
    NgForOf, MatIconModule, CrudComponent, FilterInputComponent, MatCardModule, MatTableModule
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  title = "Tag Management";
  tags = of<Tag[]>([]);


  ngOnInit(): void {
    this.loadTags();
  }
  
  constructor(
    private readonly tagService: TagsService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService
  ) {
    this.loadTags()
  }
  loadTags(): void {
    this.tags = this.tagService.searchAll();
  }

 
  read(tag: Tag): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Tag Details',
        object: this.tagService.read(tag.name)
      }
    });
  }

  create(): void {
    this.dialog.open(TagsCreationComponentComponent)
      .afterClosed()
      .subscribe(() => this.loadTags());
  }

  update(tag: Tag): void {
    this.tagService.read(tag.name)
      .subscribe(fullTag => this.dialog.open(TagsUpdatingComponentComponent, { data: fullTag }));
  }

  delete(tag: Tag): void {
    this.tagService.delete(tag.name)
      .subscribe(() => this.loadTags());
  }
}
