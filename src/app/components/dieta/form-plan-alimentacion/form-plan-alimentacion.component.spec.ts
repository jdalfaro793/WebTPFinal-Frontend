import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanAlimentacionComponent } from './form-plan-alimentacion.component';

describe('FormPlanAlimentacionComponent', () => {
  let component: FormPlanAlimentacionComponent;
  let fixture: ComponentFixture<FormPlanAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlanAlimentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlanAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
