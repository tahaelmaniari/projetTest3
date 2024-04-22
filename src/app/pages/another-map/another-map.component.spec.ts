import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherMapComponent } from './another-map.component';

describe('AnotherMapComponent', () => {
  let component: AnotherMapComponent;
  let fixture: ComponentFixture<AnotherMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
