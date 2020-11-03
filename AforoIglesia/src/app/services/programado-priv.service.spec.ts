import { TestBed } from '@angular/core/testing';

import { ProgramadoPrivService } from './programado-priv.service';

describe('ProgramadoPrivService', () => {
  let service: ProgramadoPrivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramadoPrivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
