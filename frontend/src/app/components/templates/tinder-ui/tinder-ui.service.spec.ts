import { TestBed } from '@angular/core/testing';

import { TinderUiService } from './tinder-ui.service';

describe('TinderUiService', () => {
  let service: TinderUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinderUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
