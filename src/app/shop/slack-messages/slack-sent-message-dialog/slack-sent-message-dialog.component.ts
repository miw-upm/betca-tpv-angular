import {Component, NgModule} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from "rxjs";
import {SlackMessagesService} from "../slack-messages.service";
import {SlackMessage} from "@shared/models/slack-message.model";
import {MatInputModule} from "@angular/material/input";


@Component({
  /*selector: 'app-slack-sent-message-dialog',*/
  templateUrl: 'slack-sent-message-dialog.component.html',
  styleUrls: ['slack-sent-message-dialog.component.css']
})


export class SlackSentMessageDialogComponent {
  title: string;
  levels: string[] = ['Info', 'Warning', 'Critical'];
  slackMessage: SlackMessage;

  messageLevel: string;
  subject: string;
  description: string;
  annotation: string;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<SlackSentMessageDialogComponent>,
              private slackService: SlackMessagesService) {
    this.messageLevel = this.levels[0];
    this.title = "Publish On Slack"
  }


  onSubmit(): void {

    this.slackMessage = {
      subject: this.subject,
      description: this.description,
      annotation: this.annotation
    }

    this.slackService
      .create(this.slackMessage)
      .subscribe(() => this.dialogRef.close());
  }



}
