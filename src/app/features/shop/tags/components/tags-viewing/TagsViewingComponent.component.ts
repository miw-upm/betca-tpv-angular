import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { Tag } from "../../models/tags.model";

@Component({
  standalone: true,
  selector: 'app-tags-viewing',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './TagsViewingComponent.component.html',
  styleUrls: ['./TagsViewingComponent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsViewingComponentComponent {
  constructor(
    private dialogRef: MatDialogRef<TagsViewingComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public tag: Tag
  ) { }
}
