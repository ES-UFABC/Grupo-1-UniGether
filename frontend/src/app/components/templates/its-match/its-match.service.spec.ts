import { TestBed } from '@angular/core/testing';

import { ItsMatchService } from './its-match.service';

describe('ItsMatchService', () => {
  let service: ItsMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItsMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
