import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusProjetComponent } from './status-projet.component';

describe('StatusProjetComponent', () => {
  let component: StatusProjetComponent;
  let fixture: ComponentFixture<StatusProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
