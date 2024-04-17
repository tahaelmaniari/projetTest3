import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRefFormComponent } from './app-ref-form.component';

describe('AppRefFormComponent', () => {
  let component: AppRefFormComponent;
  let fixture: ComponentFixture<AppRefFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRefFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRefFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
