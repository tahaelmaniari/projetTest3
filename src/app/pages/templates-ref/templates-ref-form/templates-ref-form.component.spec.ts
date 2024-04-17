import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesRefFormComponent } from './templates-ref-form.component';

describe('TemplatesRefFormComponent', () => {
  let component: TemplatesRefFormComponent;
  let fixture: ComponentFixture<TemplatesRefFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatesRefFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesRefFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
