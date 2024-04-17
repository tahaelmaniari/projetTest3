import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projet4Component } from './projet4.component';

describe('Projet4Component', () => {
  let component: Projet4Component;
  let fixture: ComponentFixture<Projet4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Projet4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Projet4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
