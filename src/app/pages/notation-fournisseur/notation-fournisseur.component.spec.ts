import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationFournisseurComponent } from './notation-fournisseur.component';

describe('NotationFournisseurComponent', () => {
  let component: NotationFournisseurComponent;
  let fixture: ComponentFixture<NotationFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotationFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotationFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
