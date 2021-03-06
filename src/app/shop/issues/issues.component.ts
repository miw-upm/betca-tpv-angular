import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {Issue} from './issue.model';
import {MatDialog} from '@angular/material/dialog';
import {IssueCreationDialogComponent} from './issue-creation-dialog/issue-creation-dialog.component';
import {IssueSearch} from './issue-search.model';
import {IssueService} from './issue.service';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {IssueLabel} from './issue-label.enum';
import {IssueState} from './issue-state.enum';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  title = 'Issues';
  labelValues = Object.keys(IssueLabel).filter(key => isNaN(Number(key)));
  stateValues = Object.keys(IssueState).filter(key => isNaN(Number(key)));
  issues = of([]);
  issueSearch: IssueSearch;

  constructor(private issueService: IssueService, private dialog: MatDialog) {
    this.resetSearch();
  }

  ngOnInit(): void {
  }

  create(): void {
    this.dialog.open(IssueCreationDialogComponent);
  }

  read(issue: Issue): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Issue Details',
        object: this.issueService.read(issue.number)
      }
    });
  }

  search(): void {
    this.issues = this.issueService.search(this.issueSearch);
  }

  resetSearch(): void {
    this.issueSearch = {};
    this.issueSearch.state = IssueState.all;
  }
}
