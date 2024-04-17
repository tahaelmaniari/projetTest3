import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBordereauxComponent } from './article-bordereaux.component';

describe('ArticleBordereauxComponent', () => {
  let component: ArticleBordereauxComponent;
  let fixture: ComponentFixture<ArticleBordereauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleBordereauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBordereauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
