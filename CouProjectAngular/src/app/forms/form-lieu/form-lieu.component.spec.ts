import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLieuComponent } from './form-lieu.component';

describe('FromLieuComponent', () => {
  let component: FormLieuComponent;
  let fixture: ComponentFixture<FormLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
