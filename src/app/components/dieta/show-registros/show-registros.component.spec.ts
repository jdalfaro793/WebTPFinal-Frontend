import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegistrosComponent } from './show-registros.component';

describe('ShowRegistrosComponent', () => {
  let component: ShowRegistrosComponent;
  let fixture: ComponentFixture<ShowRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
