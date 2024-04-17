import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationArticle1Component } from './estimation-article1.component';

describe('EstimationArticle1Component', () => {
  let component: EstimationArticle1Component;
  let fixture: ComponentFixture<EstimationArticle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationArticle1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationArticle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
