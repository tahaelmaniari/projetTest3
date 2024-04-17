import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projet5Component } from './projet5.component';

describe('Projet5Component', () => {
  let component: Projet5Component;
  let fixture: ComponentFixture<Projet5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Projet5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Projet5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
