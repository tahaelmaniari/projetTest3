import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationCoutComponent } from './estimation-cout.component';

describe('EstimationCoutComponent', () => {
  let component: EstimationCoutComponent;
  let fixture: ComponentFixture<EstimationCoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationCoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationCoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
