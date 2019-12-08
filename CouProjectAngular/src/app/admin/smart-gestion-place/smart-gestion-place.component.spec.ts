import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGestionPlaceComponent } from './smart-gestion-place.component';

describe('SmartGestionPlaceComponent', () => {
  let component: SmartGestionPlaceComponent;
  let fixture: ComponentFixture<SmartGestionPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGestionPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGestionPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
