import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionFacebookComponent } from './publicacion-facebook.component';

describe('PublicacionFacebookComponent', () => {
  let component: PublicacionFacebookComponent;
  let fixture: ComponentFixture<PublicacionFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionFacebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
