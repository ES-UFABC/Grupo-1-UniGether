import { TestBed } from '@angular/core/testing';

import { GroupListService } from './group-list.service';

describe('GroupListService', () => {
  let service: GroupListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
