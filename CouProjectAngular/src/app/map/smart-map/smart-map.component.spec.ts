import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMapComponent } from './smart-map.component';

describe('SmartMapComponent', () => {
  let component: SmartMapComponent;
  let fixture: ComponentFixture<SmartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
