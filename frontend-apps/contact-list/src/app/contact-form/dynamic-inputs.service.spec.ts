import { TestBed, inject } from '@angular/core/testing';

import { DynamicInputsService } from './dynamic-inputs.service';

describe('InputServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicInputsService]
    });
  });

  it('should be created', inject([DynamicInputsService], (service: DynamicInputsService) => {
    expect(service).toBeTruthy();
  }));
});
