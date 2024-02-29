import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5Component } from './top5.component';

describe('Top5Component', () => {
  let component: Top5Component;
  let fixture: ComponentFixture<Top5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
