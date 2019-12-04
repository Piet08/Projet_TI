import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpMapComponent } from './dump-map.component';

describe('DumpMapComponent', () => {
  let component: DumpMapComponent;
  let fixture: ComponentFixture<DumpMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumpMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumpMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
