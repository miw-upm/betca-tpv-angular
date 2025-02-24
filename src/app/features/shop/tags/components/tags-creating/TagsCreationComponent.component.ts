import { NgIf, NgForOf } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOption } from "@angular/material/core";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatHint } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { CrudComponent } from "@common/components/crud.component";
import { FilterInputComponent } from "@common/components/filter-input.component";
import { SearchByCompanyComponent } from "app/features/shop/shared/components/search-by-company.component";


@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [
    MatDialogTitle, MatDialogContent, MatFormField, FormsModule, MatLabel, MatHint, MatInput, MatSelect,
    MatOption, MatSlideToggle, SearchByCompanyComponent, NgIf, MatDialogActions, MatDialogClose, MatButton,
    NgForOf, MatIconModule, CrudComponent, FilterInputComponent, MatCardModule, MatTableModule
  ],
  templateUrl: './TagsCreationComponent.component.html',
  styleUrls: ['./TagsCreationComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsCreationComponentComponent { }
