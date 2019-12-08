import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMarkersComponent } from './filter-markers.component';

describe('FilterMarkersComponent', () => {
  let component: FilterMarkersComponent;
  let fixture: ComponentFixture<FilterMarkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMarkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
