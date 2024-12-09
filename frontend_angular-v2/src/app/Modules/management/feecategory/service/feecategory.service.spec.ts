import { TestBed } from '@angular/core/testing';

import { FeecategoryService } from './feecategory.service';

describe('FeecategoryService', () => {
  let service: FeecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

