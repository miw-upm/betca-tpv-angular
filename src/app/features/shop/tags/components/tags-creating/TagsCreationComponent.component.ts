import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";


@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [FormsModule, MatIconModule,MatCardModule, MatTableModule, MatIconModule, MatDialogModule,MatFormFieldModule],
  templateUrl: './TagsCreationComponent.component.html',
  styleUrls: ['./TagsCreationComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsCreationComponentComponent {
invalid: any;
update() {
throw new Error('Method not implemented.');
}
create() {
throw new Error('Method not implemented.');
}
}
