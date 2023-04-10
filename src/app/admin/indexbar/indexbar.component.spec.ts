import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexbarComponent } from './indexbar.component';

describe('IndexbarComponent', () => {
  let component: IndexbarComponent;
  let fixture: ComponentFixture<IndexbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
