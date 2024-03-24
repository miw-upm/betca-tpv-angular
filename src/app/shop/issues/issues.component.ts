import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs'; // Importa Observable y of
import { IssueService } from './issues.service';
import { IssuesCreateDialogComponent } from './issues-create-dialog.component';
import { Issue } from './issues-model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssueComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private issueService: IssueService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  issues: Issue[] = [];
  title = 'List Issues';

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.issueService.search().subscribe((issues) => {
      this.issues = issues;
      this.changeDetectorRef.detectChanges();
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(IssuesCreateDialogComponent);

    dialogRef.componentInstance.issueCreated.subscribe(() => {
      this.search();
    });
  }

  getDataAsObservable(): Observable<Issue[]> {
    return of(this.issues);
  }
}
