import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";


@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [FormsModule, MatIconModule,MatCardModule, MatTableModule],
  templateUrl: './TagsCreationComponent.component.html',
  styleUrls: ['./TagsCreationComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsCreationComponentComponent { }
