import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";


@Component({
  standalone: true,
  selector: 'app-tags-updating-component',
  imports: [ FormsModule,MatIconModule, MatCardModule, MatTableModule],
  templateUrl: './TagsUpdatingComponent.component.html',
  styleUrls: ['./TagsUpdatingComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsUpdatingComponentComponent { }
