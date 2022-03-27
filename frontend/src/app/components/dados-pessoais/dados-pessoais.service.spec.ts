import { TestBed } from '@angular/core/testing';

import { DadosPessoaisService } from './dados-pessoais.service';

describe('DadosPessoaisService', () => {
  let service: DadosPessoaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosPessoaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
