import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGestionPlaceComponent } from './single-gestion-place.component';

describe('SingleGestionPlaceComponent', () => {
  let component: SingleGestionPlaceComponent;
  let fixture: ComponentFixture<SingleGestionPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGestionPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGestionPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
