import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDietaComponent } from './registro-dieta.component';

describe('RegistroDietaComponent', () => {
  let component: RegistroDietaComponent;
  let fixture: ComponentFixture<RegistroDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
