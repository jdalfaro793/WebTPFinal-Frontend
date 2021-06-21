import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCuotaComponent } from './gestionar-cuota.component';

describe('GestionarCuotaComponent', () => {
  let component: GestionarCuotaComponent;
  let fixture: ComponentFixture<GestionarCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
