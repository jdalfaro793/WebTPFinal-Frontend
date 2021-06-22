import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlanAlimenticionComponent } from './gestion-plan-alimenticion.component';

describe('GestionPlanAlimenticionComponent', () => {
  let component: GestionPlanAlimenticionComponent;
  let fixture: ComponentFixture<GestionPlanAlimenticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPlanAlimenticionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPlanAlimenticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
