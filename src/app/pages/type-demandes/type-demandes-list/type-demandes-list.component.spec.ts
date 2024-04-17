import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemandesListComponent } from './type-demandes-list.component';

describe('TypeDemandesListComponent', () => {
  let component: TypeDemandesListComponent;
  let fixture: ComponentFixture<TypeDemandesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDemandesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDemandesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
