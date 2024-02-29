import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackSentMessageDialogComponent } from './slack-sent-message-dialog.component';

describe('SlackSentMessageDialogComponent', () => {
  let component: SlackSentMessageDialogComponent;
  let fixture: ComponentFixture<SlackSentMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlackSentMessageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackSentMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
