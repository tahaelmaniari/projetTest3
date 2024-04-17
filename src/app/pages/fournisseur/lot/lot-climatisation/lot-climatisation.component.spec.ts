import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotClimatisationComponent } from './lot-climatisation.component';

describe('LotClimatisationComponent', () => {
  let component: LotClimatisationComponent;
  let fixture: ComponentFixture<LotClimatisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotClimatisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotClimatisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
