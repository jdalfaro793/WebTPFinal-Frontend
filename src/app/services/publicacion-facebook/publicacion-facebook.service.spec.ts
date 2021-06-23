import { TestBed } from '@angular/core/testing';

import { PublicacionFacebookService } from './publicacion-facebook.service';

describe('PublicacionFacebookService', () => {
  let service: PublicacionFacebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionFacebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
