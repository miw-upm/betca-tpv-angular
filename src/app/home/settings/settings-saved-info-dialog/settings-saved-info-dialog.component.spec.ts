import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSavedInfoDialogComponent } from './settings-saved-info-dialog.component';

describe('SettingsSavedInfoDialogComponent', () => {
  let component: SettingsSavedInfoDialogComponent;
  let fixture: ComponentFixture<SettingsSavedInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSavedInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSavedInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
