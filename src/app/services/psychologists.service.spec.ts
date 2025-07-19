import { TestBed } from '@angular/core/testing';

import { PsychologistsService } from './psychologists.service';

describe('PsychologistsService', () => {
  let service: PsychologistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
