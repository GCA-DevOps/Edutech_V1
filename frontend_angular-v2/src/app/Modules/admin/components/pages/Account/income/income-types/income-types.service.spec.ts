import { TestBed } from '@angular/core/testing';

import { IncomeTypesService } from './income-types.service';

describe('IncomeTypesService', () => {
  let service: IncomeTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
