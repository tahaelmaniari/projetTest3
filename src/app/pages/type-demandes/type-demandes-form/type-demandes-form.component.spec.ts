import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandesFormComponent } from './type-demandes-form.component';

describe('TypeDemandesFormComponent', () => {
  let component: TypeDemandesFormComponent;
  let fixture: ComponentFixture<TypeDemandesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDemandesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDemandesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
