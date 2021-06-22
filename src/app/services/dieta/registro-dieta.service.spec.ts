import { TestBed } from '@angular/core/testing';

import { RegistroDietaService } from './registro-dieta.service';

describe('RegistroDietaService', () => {
  let service: RegistroDietaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroDietaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
