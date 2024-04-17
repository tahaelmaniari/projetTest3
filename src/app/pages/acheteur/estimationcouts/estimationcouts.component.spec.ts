import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationcoutsComponent } from './estimationcouts.component';

describe('EstimationcoutsComponent', () => {
  let component: EstimationcoutsComponent;
  let fixture: ComponentFixture<EstimationcoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationcoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationcoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
