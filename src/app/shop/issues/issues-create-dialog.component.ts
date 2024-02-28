import { Component, Inject } from '@angular/core';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private issueService: IssueService
  ) {
    this.newIssue = data
      ? data
      : {
          body: undefined,
          assignees: undefined,
          milestone: undefined,
          labels: undefined,
        };
    this.title = 'Create Issue';
  }

  isCreate(): boolean {
    return true;
  }

  create(): void {
    this.issueService
      .create(this.newIssue)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {}

  invalid(): boolean {
    return true;
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
