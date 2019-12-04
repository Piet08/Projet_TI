import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormConnectionComponent } from './smart-form-connection.component';

describe('SmartFormConnectionComponent', () => {
  let component: SmartFormConnectionComponent;
  let fixture: ComponentFixture<SmartFormConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFormConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
