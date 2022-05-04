import { TestBed } from '@angular/core/testing';

import { WebchatService } from './webchat.service';

describe('WebchatService', () => {
  let service: WebchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
