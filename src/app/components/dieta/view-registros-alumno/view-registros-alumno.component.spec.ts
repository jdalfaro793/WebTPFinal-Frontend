import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegistrosAlumnoComponent } from './view-registros-alumno.component';

describe('ViewRegistrosAlumnoComponent', () => {
  let component: ViewRegistrosAlumnoComponent;
  let fixture: ComponentFixture<ViewRegistrosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegistrosAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegistrosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
