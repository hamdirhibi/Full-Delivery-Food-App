import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrderPage } from './consult-order.page';

describe('ConsultOrderPage', () => {
  let component: ConsultOrderPage;
  let fixture: ComponentFixture<ConsultOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
