/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompetidorService } from './competidor.service';

describe('Service: Competidor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompetidorService]
    });
  });

  it('should ...', inject([CompetidorService], (service: CompetidorService) => {
    expect(service).toBeTruthy();
  }));
});
