import { TestBed } from '@angular/core/testing';

import { ProgramadoService } from './programado.service';

describe('ProgramadoService', () => {
  let service: ProgramadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
