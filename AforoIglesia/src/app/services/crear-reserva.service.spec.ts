import { TestBed } from '@angular/core/testing';

import { CrearReservaService } from './crear-reserva.service';

describe('CrearReservaService', () => {
  let service: CrearReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
