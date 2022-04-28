import { TestBed } from '@angular/core/testing';

import { CadastroService } from './cadastro.service';

describe('CadastroService', () => {
  let service: CadastroService;
  let sut;

  beforeEach(() => {
    sut = {}
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroService);
  });

  it('readAllUsers', () => {
    expect(service.readUsers.length).toBe(undefined);
  });
  // it('createUser', () => {

  //   expect(service.readById(1)).toBe(1);
  // });

});
