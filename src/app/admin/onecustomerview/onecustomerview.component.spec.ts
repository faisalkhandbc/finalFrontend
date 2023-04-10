import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnecustomerviewComponent } from './onecustomerview.component';

describe('OnecustomerviewComponent', () => {
  let component: OnecustomerviewComponent;
  let fixture: ComponentFixture<OnecustomerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnecustomerviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnecustomerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
