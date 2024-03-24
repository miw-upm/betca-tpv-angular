import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { NewIssue } from './issues-model';
import { IssueService } from './issues.service';

@Component({
  templateUrl: 'issues-create-dialog.component.html',
  styleUrls: ['issues-create-dialog.component.css'],
})
export class IssuesCreateDialogComponent {
  newIssue: NewIssue;
  title: string;
  @Output() issueCreated = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private issueService: IssueService
  ) {
    this.newIssue = data
      ? data
      : {
          body: undefined,
          title: undefined,
          labels: [''],
        };
    this.title = 'Create Issue';
  }

  create(): void {
    this.issueService.create(this.newIssue).subscribe(() => {
      this.issueCreated.emit();
      this.dialog.closeAll();
    });
  }
  invalid(): boolean {
    return (
      this.check(this.newIssue.body) ||
      this.check(this.newIssue.title) ||
      this.checkLabels(this.newIssue.labels)
    );
  }

  check(attr: string): boolean {
    return attr === undefined || attr === null || attr === '';
  }

  checkLabels(labels: string[]): boolean {
    return !labels || labels.length === 0;
  }
}
