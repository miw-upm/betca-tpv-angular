import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryDialogComponent } from './password-recovery-dialog.component';

describe('PasswordRecoveryDialogComponent', () => {
  let component: PasswordRecoveryDialogComponent;
  let fixture: ComponentFixture<PasswordRecoveryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
