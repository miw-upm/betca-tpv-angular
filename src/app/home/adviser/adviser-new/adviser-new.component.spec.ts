import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserNewComponent } from './adviser-new.component';

describe('AdviserNewComponent', () => {
  let component: AdviserNewComponent;
  let fixture: ComponentFixture<AdviserNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
