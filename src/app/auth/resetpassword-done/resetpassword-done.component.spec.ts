import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordDoneComponent } from './resetpassword-done.component';

describe('ResetpasswordDoneComponent', () => {
  let component: ResetpasswordDoneComponent;
  let fixture: ComponentFixture<ResetpasswordDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpasswordDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpasswordDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
