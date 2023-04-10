import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfoodQuantityComponent } from './addfood-quantity.component';

describe('AddfoodQuantityComponent', () => {
  let component: AddfoodQuantityComponent;
  let fixture: ComponentFixture<AddfoodQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfoodQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfoodQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
