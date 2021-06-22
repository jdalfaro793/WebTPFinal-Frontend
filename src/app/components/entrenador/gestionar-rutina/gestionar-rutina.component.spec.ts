import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRutinaComponent } from './gestionar-rutina.component';

describe('GestionarRutinaComponent', () => {
  let component: GestionarRutinaComponent;
  let fixture: ComponentFixture<GestionarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarRutinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
