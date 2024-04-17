import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSmartTableComponent } from './request-smart-table.component';

describe('RequestSmartTableComponent', () => {
  let component: RequestSmartTableComponent;
  let fixture: ComponentFixture<RequestSmartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSmartTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSmartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
