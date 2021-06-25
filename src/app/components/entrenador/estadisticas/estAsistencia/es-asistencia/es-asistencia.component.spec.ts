import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsAsistenciaComponent } from './es-asistencia.component';

describe('EsAsistenciaComponent', () => {
  let component: EsAsistenciaComponent;
  let fixture: ComponentFixture<EsAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
