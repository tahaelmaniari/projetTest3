import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotUniqueComponent } from './lot-unique.component';

describe('LotUniqueComponent', () => {
  let component: LotUniqueComponent;
  let fixture: ComponentFixture<LotUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotUniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
