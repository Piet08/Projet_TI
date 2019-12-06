import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlaceComponent } from './filter-place.component';

describe('FilterPlaceComponent', () => {
  let component: FilterPlaceComponent;
  let fixture: ComponentFixture<FilterPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
