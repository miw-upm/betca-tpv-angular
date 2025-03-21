import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlackMessage } from './models/slackMessage.models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedSlackService } from "./services/shared.slack.service";

@Component({
  standalone: true,
  selector: 'app-slack-publish',
  templateUrl: './slack-publish.component.html',
  styleUrls: ['./slack-publish.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class SlackPublishComponent {

      slackMessage: SlackMessage = {
        level: 'info',
        text: ''
      };

    constructor(private readonly slackService: SharedSlackService) {
    }


     publish(slackMessage: SlackMessage): void {
         this.slackService.publish(slackMessage)
           .subscribe();
       }


}
