import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRefListComponent } from './app-ref-list.component';

describe('AppRefListComponent', () => {
  let component: AppRefListComponent;
  let fixture: ComponentFixture<AppRefListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRefListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
