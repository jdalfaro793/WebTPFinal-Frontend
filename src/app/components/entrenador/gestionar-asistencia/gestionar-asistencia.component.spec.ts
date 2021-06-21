import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarAsistenciaComponent } from './gestionar-asistencia.component';

describe('GestionarAsistenciaComponent', () => {
  let component: GestionarAsistenciaComponent;
  let fixture: ComponentFixture<GestionarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
