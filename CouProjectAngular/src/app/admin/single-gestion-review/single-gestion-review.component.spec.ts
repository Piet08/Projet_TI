import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGestionReviewComponent } from './single-gestion-review.component';

describe('SingleGestionReviewComponent', () => {
  let component: SingleGestionReviewComponent;
  let fixture: ComponentFixture<SingleGestionReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGestionReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGestionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
