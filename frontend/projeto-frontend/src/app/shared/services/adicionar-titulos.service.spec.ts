import { TestBed } from '@angular/core/testing';

import { AdicionarTitulosService } from './adicionar-titulos.service';

describe('AdicionarTitulosService', () => {
  let service: AdicionarTitulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionarTitulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
