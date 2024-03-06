import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTrackingComponent } from './ticket-tracking.component';

describe('TicketTrackingComponent', () => {
  let component: TicketTrackingComponent;
  let fixture: ComponentFixture<TicketTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
