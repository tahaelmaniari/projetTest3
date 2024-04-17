import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotElectriciteComponent } from './lot-electricite.component';

describe('LotElectriciteComponent', () => {
  let component: LotElectriciteComponent;
  let fixture: ComponentFixture<LotElectriciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotElectriciteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotElectriciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
