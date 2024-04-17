import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesRefListComponent } from './templates-ref-list.component';

describe('TemplatesRefListComponent', () => {
  let component: TemplatesRefListComponent;
  let fixture: ComponentFixture<TemplatesRefListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatesRefListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesRefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
