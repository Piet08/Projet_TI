import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlaceComponent } from './gestion-place.component';

describe('GestionPlaceComponent', () => {
  let component: GestionPlaceComponent;
  let fixture: ComponentFixture<GestionPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
