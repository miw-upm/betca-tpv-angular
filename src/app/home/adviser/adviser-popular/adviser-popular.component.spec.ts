import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserPopularComponent } from './adviser-popular.component';

describe('AdviserPopularComponent', () => {
  let component: AdviserPopularComponent;
  let fixture: ComponentFixture<AdviserPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserPopularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
