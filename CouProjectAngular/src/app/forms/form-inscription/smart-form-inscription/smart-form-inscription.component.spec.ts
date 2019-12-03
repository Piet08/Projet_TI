import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormInscriptionComponent } from './smart-form-inscription.component';

describe('SmartFormInscriptionComponent', () => {
  let component: SmartFormInscriptionComponent;
  let fixture: ComponentFixture<SmartFormInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFormInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
