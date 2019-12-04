import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlaceComponent } from './form-place.component';

describe('FromLieuComponent', () => {
  let component: FormPlaceComponent;
  let fixture: ComponentFixture<FormPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
