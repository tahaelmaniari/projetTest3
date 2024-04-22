import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionBudgetProjetComponent } from './division-budget-projet.component';

describe('DivisionBudgetProjetComponent', () => {
  let component: DivisionBudgetProjetComponent;
  let fixture: ComponentFixture<DivisionBudgetProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionBudgetProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionBudgetProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
