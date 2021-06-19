import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCuotasComponent } from './mis-cuotas.component';

describe('MisCuotasComponent', () => {
  let component: MisCuotasComponent;
  let fixture: ComponentFixture<MisCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
