import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGestionReviewComponent } from './smart-gestion-review.component';

describe('SmartGestionReviewComponent', () => {
  let component: SmartGestionReviewComponent;
  let fixture: ComponentFixture<SmartGestionReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGestionReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGestionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
