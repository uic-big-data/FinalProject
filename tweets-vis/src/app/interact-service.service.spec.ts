import { TestBed } from '@angular/core/testing';

import { InteractService } from './interact-service.service';

describe('InteractServiceService', () => {
  let service: InteractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
