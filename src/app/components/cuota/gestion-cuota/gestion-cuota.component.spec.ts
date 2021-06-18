import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCuotaComponent } from './gestion-cuota.component';

describe('GestionCuotaComponent', () => {
  let component: GestionCuotaComponent;
  let fixture: ComponentFixture<GestionCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
