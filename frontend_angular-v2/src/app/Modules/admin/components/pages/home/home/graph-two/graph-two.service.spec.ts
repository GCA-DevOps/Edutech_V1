import { TestBed } from '@angular/core/testing';

import { GraphTwoService } from './graph-two.service';

describe('GraphTwoService', () => {
  let service: GraphTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
