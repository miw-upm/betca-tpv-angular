import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackPublishComponent } from './slack-publish.component';

describe('SlackPublishComponent', () => {
  let component: SlackPublishComponent;
  let fixture: ComponentFixture<SlackPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlackPublishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlackPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
