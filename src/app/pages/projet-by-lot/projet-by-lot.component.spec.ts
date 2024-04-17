import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetByLotComponent } from './projet-by-lot.component';

describe('ProjetByLotComponent', () => {
  let component: ProjetByLotComponent;
  let fixture: ComponentFixture<ProjetByLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetByLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetByLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
