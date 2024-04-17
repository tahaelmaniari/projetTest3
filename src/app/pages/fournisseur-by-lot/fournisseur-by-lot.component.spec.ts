import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurByLotComponent } from './fournisseur-by-lot.component';

describe('FournisseurByLotComponent', () => {
  let component: FournisseurByLotComponent;
  let fixture: ComponentFixture<FournisseurByLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurByLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurByLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
