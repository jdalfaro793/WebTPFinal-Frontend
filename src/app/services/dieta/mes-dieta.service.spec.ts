import { TestBed } from '@angular/core/testing';

import { MesDietaService } from './mes-dieta.service';

describe('MesDietaService', () => {
  let service: MesDietaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesDietaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
