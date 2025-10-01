import { TestBed } from '@angular/core/testing';

import { formService } from './api.service';

describe('ApiService', () => {
  let service: formService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(formService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
