import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEditPlanComponent } from './alta-edit-plan.component';

describe('AltaEditPlanComponent', () => {
  let component: AltaEditPlanComponent;
  let fixture: ComponentFixture<AltaEditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEditPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
