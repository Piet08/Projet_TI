import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormReviewComponent } from './smart-form-review.component';

describe('SmartFormReviewComponent', () => {
  let component: SmartFormReviewComponent;
  let fixture: ComponentFixture<SmartFormReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFormReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
