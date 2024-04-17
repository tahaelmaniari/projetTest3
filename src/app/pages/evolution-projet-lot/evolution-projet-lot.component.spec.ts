import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionProjetLotComponent } from './evolution-projet-lot.component';

describe('EvolutionProjetLotComponent', () => {
  let component: EvolutionProjetLotComponent;
  let fixture: ComponentFixture<EvolutionProjetLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionProjetLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionProjetLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
