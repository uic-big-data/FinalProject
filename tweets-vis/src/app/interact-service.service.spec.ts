import { TestBed } from '@angular/core/testing';

import { InteractServiceService } from './interact-service.service';

describe('InteractServiceService', () => {
  let service: InteractServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
