import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormPlaceComponent } from './smart-form-place.component';

describe('SmartFormLieuComponent', () => {
  let component: SmartFormPlaceComponent;
  let fixture: ComponentFixture<SmartFormPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFormPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
