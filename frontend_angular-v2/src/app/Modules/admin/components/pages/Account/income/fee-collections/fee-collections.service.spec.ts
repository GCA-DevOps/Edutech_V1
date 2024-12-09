import { TestBed } from '@angular/core/testing';

import { FeeCollectionsService } from './fee-collections.service';

describe('FeeCollectionsService', () => {
  let service: FeeCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
