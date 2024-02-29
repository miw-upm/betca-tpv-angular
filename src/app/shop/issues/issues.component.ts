import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IssuesCreateDialogComponent } from './issues-create-dialog.component';
import {NewIssue} from './issues-model';
import {IssueService} from './issues.service';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssueComponent implements OnInit {
  constructor(private dialog: MatDialog,private issueService: IssueService) {}
  issues = of([]);
  title = 'List Issues';
  ngOnInit(): void {
    this.search();
  }
  search(): void {
    this.issues = this.issueService.search();
  }

  resetSearch(): void {
    // this.providerSearch = {};
  }

  create(): void {
    this.dialog.open(IssuesCreateDialogComponent);
  }

  read(provider: any): void {
    /*  this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Provider Details',
        object: this.providerService.read(provider.company)
      }
    });*/
  }

  update(provider: any): void {
    /* this.providerService
      .read(provider.company)
      .subscribe(fullProvider => this.dialog.open(ProviderCreationUpdatingDialogComponent, {data: fullProvider})
        .afterClosed()
        .subscribe(() => this.search())
      );*/
  }
}
