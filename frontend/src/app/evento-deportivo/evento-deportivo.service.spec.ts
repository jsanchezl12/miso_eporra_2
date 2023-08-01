/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventoDeportivoService } from './evento-deportivo.service';

describe('Service: EventoDeportivo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventoDeportivoService]
    });
  });

  it('should ...', inject([EventoDeportivoService], (service: EventoDeportivoService) => {
    expect(service).toBeTruthy();
  }));
});
